// Coding belongs to and has many
// this is to connect to the user.js file 

const User = require('./User');
const Post = require('./Post'); // this is the actual post on the platform
const Comment = require('./Comment'); // this file is the outer later of the story 

// this is if a user has many post then create foreign key and user post can be deleted 
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//this is if a user has many story the foreign key is created and user story can be deleted as well 
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// this is if a post belongs to a user then a foreign keys is created and user's post can be deleted as well 
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//This is if a story has many post then a foreign key is created and can be deleted 
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

//This is is a story belong to a user then a foreign key is created and it can be delete.
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//this is if a post belong to a story then a foreign key is created and it can be deleted.
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment };