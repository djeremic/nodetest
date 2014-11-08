
var db = require('../models');
var randToken = require('rand-token');
var passwordHash = require('password-hash');
var mailchimp = require('../externals/mailchimp');

exports.create = function(req, res) {
    var user = req.param('user', null);
    console.log(req.body);
    var arePasswordsSame = req.param('confirmPassword', null) == user.password;
    user.token = randToken.generate(32);
    user.role = 'user';

    if(validateRegister(user, req, res)) {

        user.password = passwordHash.generate(user.password);

        db.User.find({
            where: {email: user.email, facebook_id: null}
        }).success(function(userResult){
            if(userResult != undefined || userResult != null){
                var errors = {general: new Array("User already exists, please <a href='/users/login'>login</a> to your account")};
                if(isAPIRequests(req)){
                    res.json({errors: errors});
                } else {
                    res.render('users/register', {errors: errors, layout: 'friendly'});
                }
            } else {
                db.User.create(user).success(function () {
                    mailchimp.addSubscriber(user.email);
                    if (isAPIRequests(req)) {
                        res.json({user: user});
                    } else {
                        req.session.user = user;
                        res.redirect('/')
                    }
                }).error(function (errors) {
                    if (!arePasswordsSame) {
                        errors.general.push("Passwords needs to be the same");
                    }
                    if (isAPIRequests(req)) {
                        res.json({errors: errors});
                    } else {
                        res.render('users/register', {errors: errors, layout: 'friendly'});
                    }
                })
            }
        }).error(function (errors) {});
    }
}

function isAPIRequests(req){
    return (req.path.indexOf('/api') == 0);
}

exports.register = function(req, res) {
    res.render('users/register', {layout: 'friendly'});
}

exports.login = function(req, res) {
    res.render('users/login', {layout: 'friendly'});
}

exports.logout = function(req, res) {
    req.session.user = null;
    res.redirect('/');
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
                req.session.user = user;
                if(isAPIRequests(req)){
                    res.json({user : user});
                } else {
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
            res.render('users/register', {errors: errors, layout: 'friendly'});
        }
        return false;
    }

    if(!arePasswordsSame) {
        var errors = {password: new Array("Passwords needs to be the same")};
        if(isAPIRequests(req)){
            res.json({errors: errors});
        } else {
            res.render('users/register', {errors: errors});
        }
        return false;
    }

    return true;
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

exports.admin = function(req, res, next){
    if(req.session.user == null || req.session.user == undefined || req.session.user.role != 'admin'){
        res.status(404);
        res.redirect('/unauthorized')
    } else {
        next();
    }
}

exports.facebookLoginAPI = function(req, res, next){
    var user = req.param('user', null);
    var token = randToken.generate(32);
    user.token = token;
    user.password = passwordHash.generate(token);
    user.role = 'user';
    console.log(user);

    db.User.find({
        where: {facebook_id: user.facebook_id}
    }).success(function(userModel){
        if(userModel == null){
            db.User.create(user).success(function(userModel2){
                mailchimp.addSubscriber(userModel2.email);
                res.json({user: userModel2});
            }).error(function(err){
                console.log(err);
                res.json({errors: err});
            });
        } else {
            res.json({user: userModel});
        }
    }).error(function(err){
        res.json({errors: err});
    });
}

exports.facebookLogin = function(accessToken, refreshToken, profile, done, req){
    console.log(profile);
    var token = randToken.generate(32);
    var user = {
        token : token,
        facebook_id: profile.id,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        email: profile.emails[0].value,
        password: passwordHash.generate(token),
        role: 'user'
    }

    db.User.find({
        where: {facebook_id: user.facebook_id}
    }).success(function(userModel){
        console.log(userModel);
        if(userModel == null){
            db.User.create(user).success(function(userModel2){
                req.session.user = userModel2;
                mailchimp.addSubscriber(userModel2.email);
                done(null, userModel2);
            }).error(function(err){
                console.log(err)
                done(null, null)
            });
        } else {
            req.session.user = userModel;
            done(null, userModel);
        }
    }).error(function(err){
        done(null, null)
    });

}

exports.fbSuccess = function(req, res, next){
    res.render('users/fbSuccess');
}