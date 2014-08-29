/**
 * Created by drago.jeremic on 8/28/14.
 */
module.exports = function(sequelize, DataTypes) {
    var Tag = sequelize.define('Tag', {
        value: DataTypes.STRING
    }, {
        associate: function (models) {
            Tag.hasMany(models.Restautant)
        }
    })

    return Tag;
}