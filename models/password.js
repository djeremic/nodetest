/**
 * Created by drago.jeremic on 11/5/15.
 */
module.exports = function(sequelize, DataTypes) {
    var Password = sequelize.define('Password', {
        value: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        valid: DataTypes.BOOLEAN
    })

    return Password;
}