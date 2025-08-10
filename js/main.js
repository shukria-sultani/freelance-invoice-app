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
