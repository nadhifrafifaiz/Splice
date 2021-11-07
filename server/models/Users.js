
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        profilePhoto: {
            type: DataTypes.STRING,
            allowNull: true
        },
        backgroundPhoto: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })

    Users.associate = (models) => {
        Users.hasMany(models.Posts, {
            onDelete: "cascade"
        })


        Users.hasMany(models.Comments, {
            onDelete: "cascade"
        })


        Users.hasMany(models.PostLikes, {
            onDelete: "cascade"
        })


        Users.hasMany(models.CommentLikes, {
            onDelete: "cascade"
        })


        Users.hasMany(models.Quotes, {
            onDelete: "cascade"
        })

    }


    return Users
}