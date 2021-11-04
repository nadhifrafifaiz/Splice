module.exports = (sequelize, DataTypes) => {
    const PostLikes = sequelize.define("PostLikes", {
        postLiked: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })


    return PostLikes
}