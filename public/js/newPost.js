// // create new story
// const newpost = async (event) => {
//     event.preventDefault();
//     const title = document.querySelector('input[name="story-title"]').value;
//     const content = document.querySelector('textarea[name="story-content"]').value;
//     const reponse = await fetch('/api/postRoutes', {
//         method: 'POST',
//         body: JSON.stringify({
//             title,
//             content,
//         }),
//         headers: {'Content-type': 'application/json'},
//     });
//     if (reponse.ok) {
//         document.location.replace('/profile');
//     } else{
//         alert('Error has occured');
//     }
// };