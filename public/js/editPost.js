// Get the story ID
const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

// Edit post function 
const editform = async (event) => {
    event.preventDefault();
    const title = document.querySelector('input[name="story-title"]').value;
}