module.exports = (sequelize, DataTypes) => {
    const CommentLikes = sequelize.define("CommentLikes", {
        commentLiked: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })

    return CommentLikes
}