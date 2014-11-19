var models = require('../models');

module.exports = function(sequelize, DataTypes) {
    var Place = sequelize.define('Place', {
        type: { type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
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
        phone: DataTypes.STRING,
        website: DataTypes.STRING,
        description_en: DataTypes.TEXT,
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
    })

    return Place;
}