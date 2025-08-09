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
