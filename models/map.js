/**
 * Created by drago.jeremic on 10/3/14.
 */
module.exports = function(sequelize, DataTypes) {
    var Map = sequelize.define('Map', {
        map: {type: DataTypes.STRING,
            validate: {
                notNull : true,
                notEmpty : true
            }
        },
        status: {type: DataTypes.STRING,
            validate: {
                notNull : true,
                notEmpty : true
            }
        },
        photo: DataTypes.STRING
    })

    return Map;
}