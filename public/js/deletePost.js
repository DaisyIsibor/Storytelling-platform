const deleteButton = document.querySelector('#del-post-btn');
const post_id = document.querySelector('input[name="story"]').value; 

const deleteHandler = async () => {
    const reponse = await fetch(`/api/post/${post_id}`, {
        method: 'DELETE'
    });
    if (reponse.ok) {
    document.location.replace('/profile');
    } else {
        alert(reponse.statusText);
    }
};

if(deleteButton!=null){
    deleteButton.addEventListener('click', deleteHandler);
}
