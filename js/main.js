let totalClients = document.getElementById("totalClients");
let totalInvoice = document.getElementById("totalInvoices");
let invoicesValue = document.getElementById("invoicesValue");

let clients = JSON.parse(localStorage.getItem("clients")) || [];
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

const showTotals = () => {
  totalClients.textContent = clients.length; 
  totalInvoice.textContent = invoices.length; 

  let totalInvoiceValue = invoices.reduce((accumulator, invoice) => {
    return accumulator + (invoice.amount || 0); 
  }, 0);

  invoicesValue.textContent = "Afs " + totalInvoiceValue; 
};

window.addEventListener("load", () => {
  showTotals();
});


let totalPaidAmount = 0;
let totalUnpaidAmount = 0;

// Calculate total amounts for paid and unpaid invoices
invoices.forEach(invoice => {
    if (invoice.paid) {
        totalPaidAmount += invoice.amount; 
    } else {
        totalUnpaidAmount += invoice.amount; 
    }
});

// Create the pie chart
const chartContainer = document.getElementById('invoiceStatus').getContext('2d');
const invoiceStatus = new Chart(chartContainer, {
    type: 'pie',
    data: {
        labels: ['Paid Invoices', 'Unpaid Invoices'],
        datasets: [{
            label: 'Invoices',
            data: [totalPaidAmount, totalUnpaidAmount],
            backgroundColor: ['#FFCF50', '#FF6F61'],
            hoverBackgroundColor: ['#e6b948', '#ff5b47']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 16, 
                    }
                }
            },
            title: {
                display: true,
                text: 'Invoices Overview',
                font: {
                    size: 20, 
                }
            },
            tooltip: {
                bodyFont: {
                    size: 14 // Adjust the font size for tooltip text
                }
            }
        }
    }
});
