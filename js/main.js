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

// quotes
const showQuotes = async () => {
  let quote = document.getElementById("quote");
  let author = document.getElementById("author");
  let quotesFile = "/data/quotes.json";

  try {
    let response = await fetch(quotesFile);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    let randomQuoteIndex = Math.floor(Math.random() * data.length);
    let randomQuote = data[randomQuoteIndex];

    quote.textContent = randomQuote.text;
    author.textContent = randomQuote.author;
  } catch (error) {
    quote.textContent = "Failed to load quote. Please try again.";
    author.textContent = " ";
    console.error(`An error occurred: ${error}`);
  }
};


window.addEventListener("load", () => {
  showQuotes();
  showTotals();
});

let totalPaidAmount = 0;
let totalUnpaidAmount = 0;

// Calculate total amounts for paid and unpaid invoices
invoices.forEach((invoice) => {
  if (invoice.paid) {
    totalPaidAmount += invoice.amount;
  } else {
    totalUnpaidAmount += invoice.amount;
  }
});

// Create the pie chart
const chartContainer = document
  .getElementById("invoiceStatus")
  .getContext("2d");
const invoiceStatus = new Chart(chartContainer, {
  type: "pie",
  data: {
    labels: ["Paid Invoices", "Unpaid Invoices"],
    datasets: [
      {
        label: "Invoices",
        data: [totalPaidAmount, totalUnpaidAmount],
        backgroundColor: ["#FFCF50", "#FF6F61"],
        hoverBackgroundColor: ["#e6b948", "#ff5b47"],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 16,
          },
        },
      },
      title: {
        display: true,
        text: "Invoices Overview",
        font: {
          size: 20,
        },
      },
      tooltip: {
        bodyFont: {
          size: 14,
        },
      },
    },
  },
});
