const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Story extends Model {}

Story.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    theme: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING,
        references:{
            model: 'user',
            key: 'id'
        }
    },
    // description: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },

    content_text:{
        type:DataTypes.TEXT,
        allowNull: false,
        validate:{
            len:[1]
        },
    },
    
    authorName:{
        type:DataTypes.STRING,
        allowNull: false
        },

    blog_id: {
        type: DataTypes.STRING,
        references: {
            model: 'post',
            key: 'id'
        }
    }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'story',
}
);

module.exports = Story;