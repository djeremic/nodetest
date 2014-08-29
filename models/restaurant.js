var models = require('../models');

module.exports = function(sequelize, DataTypes) {
    var Restaurant = sequelize.define('Restaurant', {
        name: { type: DataTypes.STRING,
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
        opening_hours_fr: { type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        booking: DataTypes.BOOLEAN,
        price_level: DataTypes.INTEGER,
        know_en: DataTypes.TEXT,
        know_fr: DataTypes.TEXT,
        eat_en: DataTypes.TEXT,
        eat_fr: DataTypes.TEXT,
        drink_en: DataTypes.TEXT,
        drink_fr: DataTypes.TEXT,
        tip_en: DataTypes.TEXT,
        tip_fr: DataTypes.TEXT,
        gossip_en: DataTypes.TEXT,
        gossip_fr: DataTypes.TEXT,
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