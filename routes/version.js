/**
 * Created by drago.jeremic on 2/18/15.
 */
var db = require('../models')
var jf = require('jsonfile')

exports.add = function(req, res) {
    res.render('versions/add', {
        title: 'Express'
    })
}

exports.addPost = function(req, res) {
    var version = req.param('version', null);
    db.Version.belongsTo(db.User);

    db.Version.create(version).success(function(saved) {
        saved.setUser(db.User.build({id: version.UserId})).success(function(versionFinal) {

            var file = 'tmp/version_' + versionFinal.id + '.json'
            fillDependences();
            db.Restaurant.findAll({where: {deleted: 0},include: [db.Place, db.Tag, db.Description, db.Photo], order :[[db.Description, 'id']]}).success(function(restaurants) {
                jf.writeFile(file, restaurants, function(err) {
                    console.log(err)
                })
            }).error(function (errors) {
                console.log(errors)
            });
            res.redirect('/versions')
        });
    }).error(function(errors) {
        console.log(errors);
        res.render('versions/add', {errors: errors});
    })
}

exports.index = function(req, res){
    db.User.hasMany(db.Version)
    db.Version.belongsTo(db.User)
    db.Version.find({include: [db.User], order: [['id', 'DESC']]}).success(function(version) {
        res.render('versions/index', {
            title: 'Express',
            version: version
        })
    })
}

exports.latest = function(req, res){
    db.Version.find({order: [['id', 'DESC']]}).success(function(version) {
        res.json(version)
    })
}

function fillDependences(){
    db.Restaurant.hasMany(db.Tag);
    db.Tag.hasMany(db.Restaurant);

    db.Restaurant.hasMany(db.Place);
    db.Place.hasMany(db.Restaurant);

    db.Restaurant.hasMany(db.Description);
    db.Restaurant.hasMany(db.Photo);
}
