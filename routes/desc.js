var db = require('../models')
    , Sequelize = require('sequelize')

exports.addPost = function(req, res) {
    var desc = req.param('desc', null);

    if(desc.id == null || desc.id == '') {
        db.Description.create(desc).success(function (description) {
            res.json({description: description})
        }).error(function (errors) {
            console.log(errors);
            res.status(500);
            res.json({errors: errors});
        })
    } else {
        db.Description.find(desc.id).success(function(model){
            model.updateAttributes(desc).success(function() {
                res.json({description: model})
            }).error(function (errors) {
                res.status(500);
                res.json({errors: errors});
            })
        }).error(function (errors) {
            console.log(errors);
            res.status(500);
            res.json({errors: errors});
        });
    }
}

exports.find = function(req, res) {
    var id = req.params.id;
    console.log(id);

    db.Description.find({where: {id: id}}).success(function(description){
        res.json({description: description});
    }).error(function (errors) {
        console.log(errors);
        res.status(500);
        res.json({errors: errors});
    });
}

exports.clean = function(req, res) {
    var errors = 0;
    db.Description.findAll(
        {where: ["desc_en LIKE '%<!--%'"]}
    ).success(function(descriptions){
            var chainer = new Sequelize.Utils.QueryChainer;
            console.log("size: " + descriptions.length)
            descriptions.forEach(function(description){
                var desc  = cleanHTML(description.desc_en );
                description.desc_en = desc;
                chainer.add(description.updateAttributes(description));
            });
            chainer
                .run()
                .success(function(){
                    res.render('desc/index');
                })
                .error(function(errors){
                    res.render('desc/index', {errors: errors});
                })
    }).error(function (errors) {
        console.log(errors);
    });
}

function cleanHTML(input) {
    // 1. remove line breaks / Mso classes
    var stringStripper = /(\n|\r| class=(")?Mso[a-zA-Z]+(")?)/g;
    var output = input.replace(stringStripper, ' ');
    // 2. strip Word generated HTML comments
    var commentSripper = new RegExp('<!--(.*?)-->','g');
    var output = output.replace(commentSripper, '');
    var tagStripper = new RegExp('<(/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>','gi');
    // 3. remove tags leave content if any
    output = output.replace(tagStripper, '');
    // 4. Remove everything in between and including tags '<style(.)style(.)>'
    var badTags = ['style', 'script','applet','embed','noframes','noscript'];

    for (var i=0; i< badTags.length; i++) {
        tagStripper = new RegExp('<'+badTags[i]+'.*?'+badTags[i]+'(.*?)>', 'gi');
        output = output.replace(tagStripper, '');
    }
    // 5. remove attributes ' style="..."'
    var badAttributes = ['style', 'start'];
    for (var i=0; i< badAttributes.length; i++) {
        var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"','gi');
        output = output.replace(attributeStripper, '');
    }
    return output;
}
