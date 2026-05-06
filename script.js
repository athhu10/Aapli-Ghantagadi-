// Sample Data Structure
let vehicleData = [
    { ward: "101", vehicle: "MH-12-AB-1234", driver: "Suresh Patil", phone: "9876543210", lat: 18.5204, lng: 73.8567 }
];

const tableBody = document.getElementById('table-body');
const vehicleForm = document.getElementById('vehicle-form');

// Function to render the table
function renderTable() {
    tableBody.innerHTML = "";
    vehicleData.forEach((item, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${item.ward}</td>
                <td>${item.vehicle}</td>
                <td>${item.driver}</td>
                <td><a href="tel:${item.phone}">${item.phone}</a></td>
                <td><button onclick="viewLocation(${item.lat}, ${item.lng})">📍 Live Map</button></td>
            </tr>
        `;
    });
}

// Handling Admin Manual Input
vehicleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newEntry = {
        ward: document.getElementById('wardNo').value,
        vehicle: document.getElementById('vehNo').value,
        driver: document.getElementById('driverName').value,
        phone: document.getElementById('driverPhone').value,
        lat: 18.52, // Default/Simulated
        lng: 73.85
    };
    vehicleData.push(newEntry);
    renderTable();
    vehicleForm.reset();
});

function viewLocation(lat, lng) {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
}

// Initialize
renderTable();

// Real-time Clock
setInterval(() => {
    document.getElementById('live-clock').innerText = new Date().toLocaleString('mr-IN');
}, 1000);