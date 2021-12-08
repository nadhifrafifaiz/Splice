const PostLikes = require("./PostLikes")
const { Users } = require("./index")

module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        postTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postBody: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    Posts.associate = (models) => {
        Posts.hasMany(models.PostLikes, {
            onDelete: "cascade"
        })
        Posts.hasMany(models.Comments, {
            onDelete: "cascade"
        })

        Posts.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        });
    }



    return Posts
}