const newpostFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('input[name="story-title"]').value;
    const content = document.querySelector('textarea[name="story-content"]').value;
    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Something wrong!');
    }
};

document.querySelector('#newstory-form').addEventListener('submit', newpostFormHandler);