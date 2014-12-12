/**
 * Created by Drago on 24.9.2014.
 */

var users    = require('../routes/user')
    , restaurants    = require('../routes/restaurant')
    , places    = require('../routes/place')
    , tags    = require('../routes/tag')
    , descriptions    = require('../routes/desc')
    , api    = require('../routes/api')
    , routes = require('../routes/index')
    , users = require('../routes/user')
    , errors = require('../routes/errors')
    , rates = require('../routes/rate')


module.exports = function (app) {
    app.get('/', routes.index)
    app.get('/gregory', routes.gregory)
    /*app.get('/best-of', routes.bestOf)
    app.get('/best-of-frites', routes.bestOfFrites)
    app.get('/best-of-chinese', routes.bestOfChinese)
    app.get('/best-of-croissants', routes.bestOfCroissants)
    app.get('/best-of-breads', routes.bestOfBreads)
    app.get('/coup-de-coeur-abri', routes.coupDeCoeurAbri)
    app.get('/coup-de-coeur-aki', routes.coupDeCoeurAki)
    app.get('/coup-de-coeur-amorino', routes.coupDeCoeurAmorino)
    app.get('/coup-de-coeur-blend', routes.coupDeCoeurBlend)
    app.get('/coup-de-coeur-clint', routes.coupDeCoeurClint)
    app.get('/coup-de-coeur-marie-celeste', routes.coupDeCoeurCeleste)
    app.get('/coup-de-coeur-nanashi', routes.coupDeCoeurNanashi)
    app.get('/scenarios-drunk', routes.scenariousDrunk)
    app.get('/scenarios-pop-up-question', routes.scenariousQuestion)*/
    app.post('/users/register', users.create)
    app.get('/users/register', users.register)
    app.post('/users/login', users.loginPost)
    app.get('/users/login', users.login)
    app.get('/users/logout', users.logout)
    app.get('/restaurants', restaurants.index);
    app.get('/my-restaurants', restaurants.usersRestaurants);
    app.get('/restaurants/add', users.admin, restaurants.add);
    app.get('/restaurants/edit/:id', users.admin, restaurants.edit);
    app.get('/restaurants/view/:id', restaurants.find);
    app.post('/restaurants/add', users.admin, restaurants.addPost);
    app.delete('/restaurants/delete', users.admin, restaurants.delete);
    app.post('/restaurants/favourites/add', restaurants.addToFavourite);
    app.delete('/restaurants/favourites/remove', restaurants.removeFromFavourite);
    app.get('/tags', tags.index);
    app.post('/tags/add', tags.add);
    app.post('/tags/find', tags.find);
    app.get('/places', places.index);
    app.get('/places/add', users.admin, places.add);
    app.post('/places/add', places.addPost);
    app.post('/places/find', places.find);
    app.get('/places/edit/:id', users.admin, places.edit);
    app.post('/descriptions/add', users.admin, descriptions.addPost);
    app.get('/descriptions/find/:id', users.admin, descriptions.find);
    app.get('/descriptions/clean', descriptions.clean);
    app.get('/users/fbSuccess', users.fbSuccess);
    app.get('/unauthorized', errors.unauthorized)

    //API
    app.get('/api/restaurants', api.index);
    app.get('/api/restaurants/:id', api.find);

    app.get('/api/users/restaurants', api.userList);
    app.post('/api/users/restaurants/:id', api.addToFavourite);
    app.delete('/api/users/restaurants/:id', api.removeFromFavourite);

    app.post('/api/users/login', users.loginPost);
    app.post('/api/users/register', users.create);
    app.post('/api/users/login-fb', users.facebookLoginAPI);

    app.post('/api/rates/add', rates.add);
    app.get('/api/rates', rates.find);
}
