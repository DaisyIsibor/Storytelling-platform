// Get the story ID
const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

// Edit post function 
const editform = async (event) => {
    event.preventDefault();
    const title = document.querySelector('input[name="story-title"]').value;
    const content = document.querySelector('textarea[name"story-content"]').value;
    const reponse = await fetch (`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id,
            title,
            content,
        }),
        headers: {'Content-Type': 'application/json'},
    });
    if (reponse.ok) {
        document.location.replace('/profile/');
    } else {
        alret("Error when trying to edit ")
    }
};
document.querySelector('.edit-form').addEventListener('submit', editform);