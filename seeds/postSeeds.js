const { Post } = require('../models');

const postData = [
    {
        title: "My First Story",
        story_content: "Once upon a time there was a student named Ash.  He enrolled in a computer coding bootcamp.  The camp is still ongoing.  It has been a fun camp, as well as a challenging camp.  Hopefully, its a successful camp as well.  The End!",
        user_id: 1
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;