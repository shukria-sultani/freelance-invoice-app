// Show clients in dropdown
const showClientDropdown = () => {
    const savedClients = JSON.parse(localStorage.getItem("clients")) || []; 
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

// Function to load invoices from local storage
function loadInvoices() {
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    invoices.forEach(invoice => addInvoiceToTable(invoice));
}

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

// Function to check for duplicates
function isDuplicateInvoice(newInvoice) {
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    return invoices.some(invoice =>
        invoice.client === newInvoice.client &&
        invoice.serviceTitle === newInvoice.serviceTitle &&
        invoice.date === newInvoice.date
    );
}

// Function to mark an invoice as paid
function markAsPaid(invoiceId) {
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const updatedInvoices = invoices.map(invoice => {
        if (invoice.id === invoiceId) {
            invoice.paid = true; // Mark as paid
        }
        return invoice;
    });
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
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
        amount: parseFloat(amount), // Convert to number
        date,
        paid: false // Initial status
    };

    // Check for duplicates
    if (isDuplicateInvoice(invoice)) {
        alert('This invoice already exists. Please enter a different invoice.');
        return;
    }

    // Save to local storage
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    invoices.push(invoice);
    localStorage.setItem('invoices', JSON.stringify(invoices));

    // Add invoice to table
    addInvoiceToTable(invoice);

    // Reset the form
    document.getElementById('invoiceForm').reset();
});

// Load invoices on page load
window.onload = loadInvoices;
