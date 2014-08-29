/**
 * Created by drago.jeremic on 8/21/14.
 */
module.exports = function(sequelize, DataTypes) {
    var List = sequelize.define('List', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        associate: function (models) {
            List.hasMany(models.Restaurant)
        }
    })

    return List;
}
