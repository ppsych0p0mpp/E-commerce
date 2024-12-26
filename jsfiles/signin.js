document.addEventListener('DOMContentLoaded', () => {
    const authLink = document.getElementById('authLink');
    const logoutLink = document.getElementById('logoutLink');
    
    // Check if the user is logged in
    if (localStorage.getItem('user')) {
        authLink.style.display = 'none';  // Hide Sign In/Sign Up link
        logoutLink.style.display = 'inline';  // Show Logout link
    } else {
        authLink.style.display = 'inline';  // Show Sign In/Sign Up link
        logoutLink.style.display = 'none';  // Hide Logout link
    }

    // Sign In form submission
    document.getElementById('signIn').addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('signInEmail').value.trim();
        const password = document.getElementById('signInPassword').value.trim();

        // Admin credentials
        const adminEmail = 'admin@123';
        const adminPassword = 'admin2024';

        if (email === adminEmail && password === adminPassword) {
            showCustomAlert(`${item.name}Welcome, Admin!`);
          
            window.location.href = 'admin.html'; // Navigate to admin page
            localStorage.setItem('user', 'admin'); // Store user session
        } else if (email && password) {
            // Regular user login
            alert(`Signed in as ${email}`);
            window.location.href = 'index.html'; // Redirect to user dashboard or homepage
            localStorage.setItem('user', 'regular'); // Store user session
        } else {
            alert('Please enter both email and password.');
        }
    });

    // Sign Up form submission
    document.getElementById('signUp').addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('signUpName').value.trim();
        const email = document.getElementById('signUpEmail').value.trim();
        const password = document.getElementById('signUpPassword').value.trim();

        if (name && email && password) {
            // Sign Up logic (save to DB, etc.)
            alert(`Account created for ${name}`);
            
            // Switch to Sign In tab after successful Sign Up
            const signInTab = new bootstrap.Tab(document.getElementById('signInTab'));
            signInTab.show();  // This line ensures the Sign In tab is selected after Sign Up.

            localStorage.setItem('user', 'regular'); // Store user session
        } else {
            alert('Please fill all fields.');
        }
    });
});

// Logout function
function logout() {
    // Clear user session from localStorage
    localStorage.removeItem('user');
    
    // Hide Logout link and show Sign In/Sign Up link again
    document.getElementById('authLink').style.display = 'inline';
    document.getElementById('logoutLink').style.display = 'none';
    
    // Alert user
    showCustomAlert(`${item.name}Your account has been logged out`);
  
    
    // Redirect to index page
    window.location.href = 'index.html';
}

// Custom alert function
function showCustomAlert(message) {
    const customAlert = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    const closeAlertBtn = document.getElementById('closeAlert');

    alertMessage.textContent = message;  // Set the custom message
    customAlert.style.display = 'flex';  // Show the custom alert

    // Close the custom alert when the "OK" button is clicked
    closeAlertBtn.addEventListener('click', function() {
        customAlert.style.display = 'none'; // Hide the alert after user clicks OK
    }, { once: true }); // Ensures the event listener is triggered only once

    // Optionally, close the alert after a brief delay
    setTimeout(function() {
        customAlert.style.display = 'none'; 
    }, 2000);  
}
