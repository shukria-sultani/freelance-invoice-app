import { getStoredData, setStoredData } from './utils.js';

// Show clients in dropdown
const showClientDropdown = () => {
    const savedClients = getStoredData("clients"); 
    console.log(savedClients);
    const dropdown = document.getElementById("clients");
    dropdown.innerHTML = ""; 
    savedClients.forEach((client) => {
        const option = document.createElement("option");
        option.value = client.clientName;
        option.textContent = client.clientName; 
        dropdown.appendChild(option);
    });
};
window.addEventListener('load', () => {
    showClientDropdown();
});

// Use utility functions to load invoices
let invoices = getStoredData("invoices");

// Function to add an invoice to the table
function addInvoiceToTable(invoice) {
    const tableBody = document.getElementById('invoiceTable');
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${invoice.client}</td>
        <td>${invoice.serviceTitle}</td>
        <td>${invoice.description}</td>
        <td>Afs ${invoice.amount}</td>
        <td>${invoice.date}</td>
        <td>${invoice.paid ? 'Paid' : 'Unpaid'}</td>
        <td><button onclick="markAsPaid('${invoice.id}')">Mark as Paid</button></td>
    `;
}

// Function to create a unique ID for each invoice
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Function to mark an invoice as paid
function markAsPaid(invoiceId) {
    const invoices = getStoredData("invoices");
    const updatedInvoices = invoices.map(invoice => {
        if (invoice.id === invoiceId) {
            invoice.paid = true;
        }
        return invoice;
    });
    setStoredData('invoices', updatedInvoices);
    
    // Refresh the table
    document.getElementById('invoiceTable').innerHTML = '';
    updatedInvoices.forEach(invoice => addInvoiceToTable(invoice));
}

// Form submission handler
document.getElementById('invoiceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const client = document.getElementById('clients').value;
    const serviceTitle = document.getElementById('service').value;
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;

    // Validate amount
    if (isNaN(amount) || amount.trim() === '') {
        alert('Please enter a valid number for the amount.');
        return;
    }

    // Create invoice object
    const invoice = {
        id: generateId(),
        client,
        serviceTitle,
        description,
        amount: parseFloat(amount),
        date,
        paid: false
    };

    // Use the getStoredData utility function to check for duplicates
    const invoicesData = getStoredData('invoices');
    const isDuplicate = invoicesData.some(existingInvoice =>
        existingInvoice.client === invoice.client &&
        existingInvoice.serviceTitle === invoice.serviceTitle &&
        existingInvoice.date === invoice.date
    );

    if (isDuplicate) {
        alert('This invoice already exists. Please enter a different invoice.');
        return;
    }

    // Use the getStoredData and setStoredData utility functions
    invoicesData.push(invoice);
    setStoredData('invoices', invoicesData);

    // Add invoice to table
    addInvoiceToTable(invoice);

    // Reset the form
    document.getElementById('invoiceForm').reset();
});

// Load invoices on page load
window.onload = () => {
    invoices.forEach(invoice => addInvoiceToTable(invoice));
};