// // Editing user details, write user details, create user details, update user details
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type:String,
            required:true
        },
        authorName:{
            type:String,
            allowNull: false
        },
        user_id: {
            type: DataTypes.STRING,
            references:{
                model: 'user',
                key: 'id'
            }
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
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
    });

module.exports = Blog;