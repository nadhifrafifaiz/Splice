
module.exports = (sequelize, DataTypes) => {
    const Quotes = sequelize.define("Quotes", {
        quote: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })


    return Quotes
}