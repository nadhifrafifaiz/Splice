
module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define("Roles", {
        role: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return Roles
}