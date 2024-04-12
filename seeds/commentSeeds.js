const { Comment } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 1,
        theme: "non-fiction",
        comment_text: "Great story! J.K. Rowling would be very jealous of great storytelling like this."
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;