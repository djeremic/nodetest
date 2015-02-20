module.exports = function(sequelize, DataTypes) {
    var Version = sequelize.define('Version', {
        description: DataTypes.STRING
    }, {
        associate: function (models) {
            Version.hasOne(models.User)
        }
    })

    return Version;
}