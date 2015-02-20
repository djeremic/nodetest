/**
 * Created by drago.jeremic on 2/18/15.
 */
var db = require('../models')

exports.add = function(req, res) {
    res.render('versions/add', {
        title: 'Express'
    })
}

exports.addPost = function(req, res) {
    var version = req.param('version', null);

    db.Version.create(version).success(function(saved) {
        saved.setUser(db.User.build({id: version.UserId})).success(function(versionFinal) {
            res.redirect('/versions')
        });
        res.redirect('/versions')
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
