const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    theme: {
        type: DataTypes.STRING,
        // allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references:{
            model: 'user',
            key: 'id'
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: 'id'
        }
    },
    comment_text:{
        type:DataTypes.TEXT,
        allowNull: false,
        validate:{
            len:[1]
        },
    },
    // description: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    // authorName:{
    //     type:DataTypes.STRING,
    //     allowNull: false
    //     },
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
}
);

module.exports = Comment;