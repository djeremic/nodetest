var models = require('../models');

module.exports = function(sequelize, DataTypes) {
    var Place = sequelize.define('Place', {
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