// logout button details (eventlistener, queryselector, etc...)

// const logout = async () => {
//     const response = await fetch('/api/users/logout', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//     document.location.replace('/');
//     } else {
//     alert(response.statusText);
//     }
// };

// document.querySelector('#logout').addEventListener('click', logout);


// logout.js
// const logout = async () => {
//     try {
//         const response = await fetch('/api/users/logout', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {
//             // Redirect to the home page after successful logout
//             document.location.replace('/');
//         } else {
//             alert('Logout failed');
//         }
//     } catch (err) {
//         console.error('Logout error:', err);
//         alert('An error occurred during logout');
//     }
// };

// document.querySelector('#logout').addEventListener('click', logout);


const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);
  