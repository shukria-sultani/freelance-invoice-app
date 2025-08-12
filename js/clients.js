// Import the utility functions from the new file
import { getStoredData, setStoredData } from './utils.js'

// Load clients directly 
let clients = getStoredData("clients");


// Add clients
const clientForm = document.getElementById("clientForm");
clientForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let clientName = document.getElementById("name").value;
    let clientEmail = document.getElementById("email").value;
    let company = document.getElementById("company").value;
    let note = document.getElementById("note").value;

    let newClient = {
        clientName: clientName,
        clientEmail: clientEmail,
        company: company,
        note: note,
    };

    const isDuplicate = clients.some(client =>
        client.clientName === newClient.clientName &&
        client.clientEmail === newClient.clientEmail
    );

    if (isDuplicate) {
        alert("Client already exists!");
        return;
    } else {
        clients.push(newClient);
    }

      // Use the utility function to update localStorage
    setStoredData("clients", clients);

    alert("Successfully Added the Client!");
    showClients();
    clientForm.reset();
});

// Show the clients dynamically
document.addEventListener("DOMContentLoaded", () => {
    showClients();
});

const showClients = () => {
    const clientTableBody = document.getElementById("clientTable");
    if (!clientTableBody) {
        console.error("clientTable is undefined. Check if the table exists in the DOM.");
        return; 
    }
    clientTableBody.innerHTML = ""; 
    clients.forEach((client, index) => {
        let row = clientTableBody.insertRow();
        row.innerHTML = `
            <td>${client.clientName}</td>
            <td>${client.clientEmail}</td>
            <td>${client.company}</td>
            <td class="note">${client.note}</td>
            <td>
                <button onclick="openEditModal(${index})">Edit</button>
                <button onclick="deleteClient(${index})">Delete</button>
            </td>
        `;
    });
};

// Open the modal for editing
const openEditModal = (index) => {
    const client = clients[index];
    document.getElementById("editName").value = client.clientName;
    document.getElementById("editEmail").value = client.clientEmail;
    document.getElementById("editCompany").value = client.company;
    document.getElementById("editNote").value = client.note;
    document.getElementById("editIndex").value = index;
    document.getElementById("editModal").style.display = "block"; // Show the modal
};

// Update client information
const updateClientInfo = () => {
    const index = document.getElementById("editIndex").value;
    clients[index].clientName = document.getElementById("editName").value;
    clients[index].clientEmail = document.getElementById("editEmail").value;
    clients[index].company = document.getElementById("editCompany").value;
    clients[index].note = document.getElementById("editNote").value;

    localStorage.setItem("clients", JSON.stringify(clients));
    alert("Client information updated!");
    showClients();
    closeEditModal(); // Close the modal
};

// Close the modal
const closeEditModal = () => {
    document.getElementById("editModal").style.display = "none"; // Hide the modal
};

// Delete a client
const deleteClient = (index) => {
    clients.splice(index, 1);
    localStorage.setItem("clients", JSON.stringify(clients));
    showClients();
};
