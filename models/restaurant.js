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
        address: { type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        phone: { type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        website: { type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
                isUrl: true
            }
        },
        metro: DataTypes.STRING,
        opening_hours_en: { type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        opening_hours_fr: DataTypes.STRING,
        kind_of_food_en: { type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        kind_of_food_fr: DataTypes.STRING,
        feeling_en: { type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        feeling_fr: DataTypes.STRING,
        dress_code_en: { type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        dress_code_fr: DataTypes.STRING,
        go_for: { type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        booking_en: DataTypes.STRING,
        price_level: DataTypes.INTEGER,
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
            Restautant.hasMany(models.Tag)
        }
    })

    return Restaurant;
}