/**
 * Created by drago.jeremic on 2/28/15.
 */
var db = require('../models')

exports.uploadPost = function(req, res){
    console.log(req.files)

    var photos = [];

    for (var prop in req.files) {
        photos.push({originalname: req.files[prop].originalname, name: req.files[prop].name, path: req.files[prop].path});
    }
    console.log(photos);

    if(photos.length > 0) {
        db.Photo.bulkCreate(photos).then(function () {
            db.Photo.findAll({limit: photos.length, order: 'id DESC'}).success(function (results) {
                res.json({photos: results});
            }).error(function (errors) {
                res.status('500').json({errors: errors});
            })
        });
    } else {
        res.json({photos: {}});
    }
}
