
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
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        profilePhoto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        backgroundPhoto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false
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