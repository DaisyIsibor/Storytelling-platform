 // Editing user details, write user details, create user details, update user details
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        story_content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        theme: {
            type: DataTypes.STRING,
            allowNull: true 
        },
        user_id: {
            type: DataTypes.INTEGER,
            references:{
                model: 'user',
                key: 'id'
            }
        },
        // likes: {
        //     type: DataTypes.ARRAY(DataTypes.STRING),
        //     defaultValue: []
        // },
        // category: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
    },
        {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
        }
    );

module.exports = Post;