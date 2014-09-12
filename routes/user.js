
var db = require('../models');
var randToken = require('rand-token');
var passwordHash = require('password-hash');

exports.create = function(req, res) {
    var user = req.param('user', null);
    var arePasswordsSame = req.param('confirmPassword', null) == user.password;
    user.token = randToken.generate(32);

    validateRegister(user, req, res);

    user.password = passwordHash.generate(user.password);

    db.User.create(user).success(function() {
        if(isAPIRequests(req)){
            res.json({user: user});
        } else {
            req.session.user = user;
            res.redirect('/')
        }
    }).error(function(errors) {
        if(!arePasswordsSame) {
            errors.password.push("Passwords needs to be the same");
        }
        if(isAPIRequests(req)){
            res.json({errors: errors});
        } else {
            res.render('users/register', {errors: errors});
        }
    })
}

function isAPIRequests(req){
    return (req.path.indexOf('/api') == 0);
}

exports.register = function(req, res) {
    res.render('users/register');
}

exports.login = function(req, res) {
    res.render('users/login');
}

exports.logout = function(req, res) {
    req.session.user = null;
    res.render('users/login');
}

exports.loginPost = function(req, res) {
    var usr = req.param('user', null);
    db.User.find({
        where: {email : usr.email}
    }).success(function(user){
        if(user != null){
            if(!passwordHash.verify(usr.password, user.password)){
                var errors = {general: new Array("User not found")};
                if(isAPIRequests(req)){
                    res.json({errors: errors});
                } else {
                    res.render('users/login', {errors: errors});
                }
            } else {
                if(isAPIRequests(req)){
                    res.json({user : user});
                } else {
                    req.session.user = user;
                    res.redirect('/');
                }
            }
        } else {
            console.log("user not found");
            var errors = {general: new Array("User not found")};
            if(isAPIRequests(req)){
                res.json({errors: errors});
            } else {
                res.render('users/login', {errors: errors});
            }
        }
    }).error(function(err) {
        var errors = {general: new Array("User not found")};
        if(isAPIRequests(req)){
            res.json({errors: errors});
        } else {
            res.render('users/login', {errors: errors});
        }
    })
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function validateRegister(user, req, res){
    var errors = db.User.build(user).validate();
    var arePasswordsSame = req.param('confirmPassword', null) == user.password;

    if(errors && errors.size > 0){
        if(isAPIRequests(req)){
            res.json({errors: errors});
        } else {
            res.render('users/register', {errors: errors});
        }
    }

    if(!arePasswordsSame) {
        var errors = {password: new Array("Passwords needs to be the same")};
        if(isAPIRequests(req)){
            res.json({errors: errors});
        } else {
            res.render('users/register', {errors: errors});
        }
    }
}

exports.auth = function(req, res, next){
    if(req.header('token')){
        db.User.find({
            where: {token : req.header('token')}
        }).success(function(user){
           if(user != null){
                next();
           } else {
               res.status('401').json({errors : 'Unauthorized'});
           }
        }).error(function(){
            res.status('401').json({errors : 'Unauthorized'});
        });
    } else {
        res.status('401').json({errors : 'Unauthorized'});
    }

}