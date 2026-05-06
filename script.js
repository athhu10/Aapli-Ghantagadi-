x// ... (Your Firebase Config stays here) ...

window.findMyVehicle = function() {
    const inputWard = document.getElementById('visitor-ward-input').value;
    if(!inputWard) return alert("कृपया वॉर्ड क्रमांक टाका!");

    const vehicleRef = ref(db, 'vehicles/' + inputWard);

    onValue(vehicleRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            document.getElementById('result-popup').style.display = 'flex';
            document.getElementById('display-ward').innerText = "वॉर्ड क्रमांक: " + data.ward;
            document.getElementById('display-veh').innerText = data.vehicle;
            document.getElementById('display-driver').innerText = data.driver;
            document.getElementById('display-link').href = "tel:" + data.phone;
            document.getElementById('display-link').innerText = data.phone;
            
            document.getElementById('live-map-btn').onclick = function() {
                window.open(`https://www.google.com/maps?q=${data.lat},${data.lng}`, '_blank');
            };
        } else {
            alert("या वॉर्डचा डेटा सापडला नाही!");
        }
    });
}

window.closeResult = function() {
    document.getElementById('result-popup').style.display = 'none';
}

// Live Clock
setInterval(() => {
    const now = new Date();
    document.getElementById('live-clock').innerText = now.toLocaleTimeString('mr-IN') + " | " + now.toLocaleDateString('mr-IN');
}, 1000)