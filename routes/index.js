var db = require('../models')

exports.index = function(req, res){
    res.render('routes/index', {
        layout: 'friendly',
        home: true
    })
}

exports.bestOf = function(req, res){
    res.render('routes/best-of', {
        layout: 'friendly',
        bestof: true
    })
}

exports.bestOfFrites = function(req, res){
    res.render('routes/best-of-frites', {
        layout: 'friendly',
        bestof: true
    })
}

exports.bestOfChinese = function(req, res){
    res.render('routes/best-of-chinese', {
        layout: 'friendly',
        bestof: true
    })
}
