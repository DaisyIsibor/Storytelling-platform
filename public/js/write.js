// const newpostFormHandler = async (event) => {
//     event.preventDefault();
//     const title = document.querySelector('input[name="story-title"]').value;
//     const content = document.querySelector('textarea[name="story-content"]').value;
//     const response = await fetch('/api/post', {
//         method: 'POST',
//         body: JSON.stringify({
//             title,
//             content,
//         }),
//         headers: { 'Content-Type': 'application/json' },
//     });
//     if (response.ok) {
//         document.location.replace('/profile');
//     } else {
//         alert('Something wrong!');
//     }
// };

// document.querySelector('#newstory-form').addEventListener('submit', newpostFormHandler);


// Ensure that your write.js script sends a POST request to the correct endpoint
const newpostFormHandler = async (event) => {
    event.preventDefault();
JamesH
    console.log("Testlin2")
    const title = document.querySelector('input[name="story-title"]').value;
    const content = document.querySelector('textarea[name="story-content"]').value;
    const response = await fetch('/api/post', {

    
    // Get values from form elements
    const title = document.querySelector('input[name="title"]').value;
    const content = document.querySelector('textarea[name="content"]').value;
    const theme = document.querySelector('select[name="theme"]').value;
    
    // Send data to the server
    const response = await fetch('/api/postRoute/write', {  // Update the URL here
 main
        method: 'POST',
        body: JSON.stringify({
            title,
            content,
            theme,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    // Handle response
    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Something went wrong!');
    }
};

document.querySelector('#write-form').addEventListener('submit', newpostFormHandler);
