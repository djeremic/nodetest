/**
 * Created by drago.jeremic on 10/3/14.
 */
module.exports = function(sequelize, DataTypes) {
    var Arrondisement = sequelize.define('Arrondisement', {
        name: { type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true
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

    return Arrondisement;
}