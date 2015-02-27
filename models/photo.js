/**
 * Created by drago.jeremic on 2/25/15.
 */
module.exports = function(sequelize, DataTypes) {
    var Photo = sequelize.define('Photo', {
        name: DataTypes.STRING,
        originalname: DataTypes.STRING,
        path: DataTypes.STRING
    }, {
        associate: function (models) {
            Photo.belongsTo(models.Restautant)
        }
    })

    return Photo;
}