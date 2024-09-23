document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const errorMessage = document.getElementById('register-error-message');

    // Basic validation
    if (newPassword !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match!';
        errorMessage.style.display = 'block';
    } else {
        // Store the new user data in localStorage
        const registrationTime = new Date().toLocaleString();
        localStorage.setItem('registeredUsername', newUsername);
        localStorage.setItem('registeredPassword', newPassword);
        localStorage.setItem('registrationTime', registrationTime);
        localStorage.setItem('email', email);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('phoneNumber', phoneNumber);

        alert('Registration successful!');
        window.location.href = 'login.html';
    }
});
