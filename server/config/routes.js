/// <reference path="../controllers/users.js" />
var auth = require('./auth'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Word = mongoose.model('Word'),
    Language = mongoose.model('Language'),
    userController = require('../controllers/users'),
    wordController = require('../controllers/words'),
    languageController = require('../controllers/languages');

module.exports = function (app, passport) {

    app.get('/api/users', auth.requiresRole('admin'), userController.getUsers);
    app.post('/api/users', userController.createUser);
    app.put('/api/users', userController.updateUser);

    app.get('/api/users/:id', auth.requiresRole('admin'), userController.getUser);

    app.get('/api/words', wordController.getWords);
    app.put('/api/words', auth.requiresRole('admin'), wordController.updateWord);
    app.post('/api/words', auth.requiresRole('admin'), wordController.createWord);
    app.delete('/api/words/:id', auth.requiresRole('admin'), wordController.deleteWord);
    app.get('/api/words/:id', auth.requiresRole('admin'), wordController.getWord);

    app.get('/api/languages', languageController.getLanguages);
    app.put('/api/languages', auth.requiresRole('admin'), languageController.updateLanguage)
    app.post('/api/languages', auth.requiresRole('admin'), languageController.createLanguage)
    app.delete('/api/languages/:id', auth.requiresRole('admin'), languageController.deleteLanguage)
    app.get('/api/languages/:id', auth.requiresRole('admin'), languageController.getLanguage);

    app.get('/partials/*', function (req, res) {
        res.render('partials/' + req.params);
    });
    
    // FACEBOOK ROUTES 
    // 
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
		    successRedirect: '/profile',
		    failureRedirect: '/'
		}));

    // GOOGLE ROUTES 
    //
    // route for google authentication and login
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect: '/profile',
                failureRedirect: '/'
            }));

    // TWITTER ROUTES 
    // 
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
		    successRedirect: '/profile',
		    failureRedirect: '/'
		}));

    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

    // locally --------------------------------
    
    app.post('/connect/local', passport.authenticate('local-connect', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/connect/local', // redirect back to the signup page if there is an error       
    }));

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
        passport.authorize('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


    // google ---------------------------------

    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

    // the callback after google has authorized the user
    app.get('/connect/google/callback',
        passport.authorize('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.all('/api/*', function (req, res) {
        res.send(404);
    });

    app.get('*', function (req, res) {
        res.render('index', {
            currentUser: req.user
        });
    });
}