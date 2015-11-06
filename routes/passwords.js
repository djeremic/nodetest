/**
 * Created by drago.jeremic on 11/5/15.
 */
var db = require('../models');
var passwordHash = require('password-hash');
var randToken = require('rand-token');

exports.sendMail = function (app){

    return function(req, res) {

        var email = req.body.email;

        db.User.find({
            where: {email : email}
        }).success(function(user){
            if(user != null){

                var password = {
                    userId : user.id,
                    value :  randToken.generate(32),
                    valid : true
                }

                db.Password.create(password).success(function(passwordRes){
                    app.mailer.send(
                        {
                            template: 'passwords/forgot'
                        }, {
                            to: user.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                            subject: 'Reset Password', // REQUIRED.
                            user: user, // All additional properties are also passed to the template as local variables.
                            password: passwordRes,
                            layout: 'empty'
                        }, function (err) {
                            if (err) {
                                // handle error
                                console.log(err);
                                var errors = {general: new Array("There was an error sending the email")};
                                if (isAPIRequests(req)) {
                                    res.json({user: user});
                                } else {
                                    res.render('passwords/index', {errors: errors});
                                }
                            }
                            if (isAPIRequests(req)) {
                                res.json({success: 'success'});
                            } else {
                                res.redirect('/passwords/sent');
                            }
                        });
                });

            } else {
                console.log("user not found");
                var errors = {general: new Array("User not found")};
                if(isAPIRequests(req)){
                    res.status('500').json({errors: errors});
                } else {
                    res.render('passwords/index', {errors: errors, layout: 'final'});
                }
            }
        }).error(function(err) {
            var errors = {general: new Array("User not found")};
            if(isAPIRequests(req)){
                res.status('500').json({errors: errors});
            } else {
                res.render('passwords/index', {errors: errors});
            }
        })

    }
}

exports.index = function(req, res){
    res.render('passwords/index', {
        layout: 'final'
    })
}

exports.sent = function(req, res){
    res.render('passwords/sent', {
        layout: 'final'
    })
}

function isAPIRequests(req){
    return (req.path.indexOf('/api') == 0);
}

exports.reset = function(req, res){
    var hash = req.params.hash;

    db.Password.find({
        where: {value : hash}
    }).success(function(passwordRes){
        if(!passwordRes.valid){
            var errors = {general: new Array("Reset password link has already been used, please make a new reset password request")}
            res.render("passwords/error-reset", {errors: errors, layout: 'final'});
        } else {
            passwordRes.valid = false;
            passwordRes.updateAttributes(passwordRes).success(function() {
                var id = passwordRes.userId;
                res.render('passwords/reset', {id: id, layout: 'final'});
            })
        }
    }).error(function(errors){
        console.log(errors);
        var errors = {general: new Array("Invalid reset password link")};
        res.render("passwords/error-reset", {errors: errors, layout: 'final'})
    })
}

exports.resetPost = function(req, res){
    var user = req.param('user', null);
    var arePasswordsSame = req.param('confirmPassword', null) == user.password;
    user.password = passwordHash.generate(user.password);

    if(arePasswordsSame) {
        db.User.find({
            where: {id: user.id}
        }).success(function (userModel) {
            userModel.password = user.password;
            userModel.updateAttributes(userModel).success(function(usr) {
                req.session.user = usr;
                res.render('passwords/success', {layout: 'final'});
            })
        })
    } else {
        var errors = {general: new Array("Passwords need to be the same")}
        res.render('passwords/reset', {id: user.id, errors: errors, layout: 'final'});
    }
}


exports.magicLink = function(req, res){
    var hash = req.params.hash;

    db.Password.find({
        where: {value : hash}
    }).success(function(passwordRes){
        if(!passwordRes.valid){
            var errors = {general: new Array("Reset password link has already been used, please make a new reset password request")}
            res.json({errors: errors});
        } else {
            passwordRes.valid = false;
            passwordRes.updateAttributes(passwordRes).success(function() {
                var id = passwordRes.userId;
                db.User.find({
                    where:{id: id}
                }).success(function(user){
                    res.json({user: user});
                })
            })
        }
    }).error(function(errors){
        console.log(errors);
        var errors = {general: new Array("Invalid reset password link")};
        res.status('500').json({errors: errors});
    })
}