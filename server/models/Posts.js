const PostLikes = require("./PostLikes")

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
    }



    return Posts
}