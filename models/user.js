module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('User', {
        email: {type: Sequelize.STRING,
            validate: {
                notNull : true,
                notEmpty : true,
                isEmail: true
             }
        },
        first_name: {type: Sequelize.STRING,
            validate: {
                notNull : true,
                notEmpty : true
            }
        },
        last_name: {type: Sequelize.STRING,
            validate: {
                notNull : true,
                notEmpty : true
            }
        },
        password: {
            type: Sequelize.STRING,
            validate: {
                notNull : true,
                notEmpty : true
            }
        },
        token: {
            type: Sequelize.STRING,
            validate: {
                notNull : true,
                notEmpty : true
            }
        },
        facebook_id: Sequelize.STRING
    }, {
        associate: function (models) {
            User.hasMany(models.Restaurants);
        }
    })

    return User
}