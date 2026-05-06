import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = { /* PASTE YOUR CONFIG FROM PREVIOUS STEP */ };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

window.sendOTP = function() {
    const phoneNumber = document.getElementById('staff-phone').value;
    const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            document.getElementById('login-step-1').style.display = 'none';
            document.getElementById('login-step-2').style.display = 'block';
        }).catch((error) => { alert("Error: " + error.message); });
}

window.verifyOTP = function() {
    const code = document.getElementById('otp-input').value;
    confirmationResult.confirm(code).then((result) => {
        markAttendance(result.user);
    }).catch(() => { alert("चुकीचा OTP!"); });
}

function markAttendance(user) {
    const name = document.getElementById('staff-name').value;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD

    const attendanceRef = ref(db, 'attendance/' + dateStr + '/' + user.uid);
    
    set(attendanceRef, {
        name: name,
        phone: user.phoneNumber,
        time: now.toLocaleTimeString(),
        status: "Present"
    }).then(() => {
        document.getElementById('login-step-2').style.display = 'none';
        document.getElementById('attendance-success').style.display = 'block';
        document.getElementById('attendance-time').innerText = "वेळ: " + now.toLocaleTimeString();
    });
}