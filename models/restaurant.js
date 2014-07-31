module.exports = function(sequelize, DataTypes) {
    var Restaurant = sequelize.define('Restaurant', {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        longitude: DataTypes.DECIMAL,
        latitude: DataTypes.DECIMAL
    }, {
        associate: function (models) {
            Restaurant.hasMany(models.Users)
        }
    })

    return Restaurant;
}