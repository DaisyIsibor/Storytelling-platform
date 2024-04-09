// // Editing user details, write user details, create user details, update user details
// const mongoose=require('mongoose')
// const blogSchema=new mongoose.Schema({
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
    {
        title:{
            type:String,
            required:true
        },
        authorid:{
            type:String,
            required:true
        },
        authorName:{
            type:String
        },
        authorId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        likes: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        publishDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        readTime: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

module.exports = Blog;