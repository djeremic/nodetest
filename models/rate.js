/**
 * Created by drago.jeremic on 11/25/14.
 */
var models = require('../models');

module.exports = function(sequelize, DataTypes) {
    var Rate = sequelize.define('Rate', {
        food: DataTypes.INTEGER,
        service: DataTypes.INTEGER,
        fun: DataTypes.INTEGER
    }, {
        associate: function (models) {
            Rate.hasOne(models.Restaurant);
            Rate.hasOne(models.User);
        }
    })

    return Rate;
}