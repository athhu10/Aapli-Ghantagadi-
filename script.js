// --- ALL PREVIOUS FIREBASE CONFIG REMAINS THE SAME ---

// Function for Visitor Search
window.findMyVehicle = function() {
    const inputWard = document.getElementById('visitor-ward-input').value;
    const vehicleRef = ref(db, 'vehicles/' + inputWard);

    onValue(vehicleRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // Hide entry modal
            document.getElementById('visitor-modal').style.display = 'none';
            // Show result popup
            document.getElementById('result-popup').style.display = 'flex';
            
            // Fill data
            document.getElementById('display-ward').innerText = "वॉर्ड क्रमांक: " + data.ward;
            document.getElementById('display-veh').innerText = data.vehicle;
            document.getElementById('display-driver').innerText = data.driver;
            document.getElementById('display-link').href = "tel:" + data.phone;
            document.getElementById('display-link').innerText = "📞 " + data.phone;
            
            // Map Button Logic
            document.getElementById('live-map-btn').onclick = function() {
                window.open(`https://www.google.com/maps?q=${data.lat},${data.lng}`, '_blank');
            };
        } else {
            alert("या वॉर्डची माहिती उपलब्ध नाही. कृपया अचूक क्रमांक टाका.");
        }
    });
}

window.closeResult = function() {
    document.getElementById('result-popup').style.display = 'none';
    document.getElementById('visitor-modal').style.display = 'flex';
}