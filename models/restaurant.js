var models = require('../models');

module.exports = function(sequelize, DataTypes) {
    var Restaurant = sequelize.define('Restaurant', {
        name: { type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        title_en: { type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        website: DataTypes.STRING,
        metro: DataTypes.STRING,
        opening_hours_frames: DataTypes.STRING,
        opening_hours_en: DataTypes.STRING,
        opening_hours_fr: DataTypes.STRING,
        kind_of_food_en: DataTypes.STRING,
        kind_of_food_fr: DataTypes.STRING,
        feeling_en: DataTypes.STRING,
        feeling_fr: DataTypes.STRING,
        dress_code_en: DataTypes.STRING,
        dress_code_fr: DataTypes.STRING,
        go_for: DataTypes.STRING,
        booking_en: DataTypes.STRING,
        price_level: DataTypes.INTEGER,
        deleted: DataTypes.INTEGER,
        paused: DataTypes.INTEGER,
        closed: DataTypes.INTEGER,
        longitude: { type: DataTypes.DECIMAL,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        latitude: { type: DataTypes.DECIMAL,
            validate: {
                notNull: true,
                notEmpty: true
            }
        }
    }, {
        associate: function (models) {
            Restautant.hasMany(models.Tags)
            Restautant.hasMany(models.Rates)
        }
    })

    return Restaurant;
}