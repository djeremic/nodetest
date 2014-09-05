/**
 * Created by drago.jeremic on 9/4/14.
 */
var models = require('../models');

module.exports = function(sequelize, DataTypes) {
    var Description = sequelize.define('Description', {
        title: { type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        desc_en: { type: DataTypes.TEXT,
            validate: {
                notNull: true,
                notEmpty: true
            }
        },
        desc_fr: DataTypes.TEXT
    })

    return Description;
}