// // login button details and Sign Up (eventlistener, queryselector, etc...)
// const loginFormHandler = async (event) => {
//     event.preventDefault();

//     // Collect values from the login form
//     const email = document.querySelector('#email-login').value.trim();
//     const password = document.querySelector('#password-login').value.trim();

//     if (email && password) {
//       // Send a POST request to the API endpoint
//     const response = await fetch('/api/users/login', {
//         method: 'POST',
//         body: JSON.stringify({ email, password }),
//         headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//         // If successful, redirect the browser to the profile page
//         document.location.replace('/profile');
//     } else {
//         alert(response.statusText);
//     }
//     }
// };

const loginFormHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get email and password from the form inputs
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // Check if email and password are provided
    if (email && password) {
        try {
            // Send a POST request to the login endpoint
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            // Check if the response is successful
            if (response.ok) {
                // Redirect to the profile page after successful login
                document.location.replace('/profile');
            } else {
                // Display an error message if login fails
                alert('Login failed. Please check your email and password.');
            }
        } catch (err) {
            console.error('Error:', err); // Log any errors for debugging
            alert('An error occurred while logging in. Please try again later.');
        }
    } else {
        // Display an error message if email or password is empty
        alert('Please enter your email and password.');
    }
};


const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/profile');
    } else {                                                     
        alert(response.statusText);
    }
    }
};

document
    .querySelector('.form.login-form')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
