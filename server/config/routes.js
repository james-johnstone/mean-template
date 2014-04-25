var auth                = require('./auth'),
    path                = require('path'),
    mongoose            = require('mongoose'),
    User                = mongoose.model('User'),
    Word                = mongoose.model('Word'),
    Language            = mongoose.model('Language'),
    userController      = require('../controllers/users'),
    wordController      = require('../controllers/words'),
    languageController  = require('../controllers/languages');

module.exports = function (app, passport) {

    //====================================================================
    // API ROUTES
    //====================================================================

    //-- users
    app.route('/api/users')
        .get(auth.requiresRole('admin'), userController.getUsers)
        .post(userController.createUser)
        .put(userController.updateUser);

    app.get('/api/users/:id', auth.requiresRole('admin'), userController.getUser);

    //-- words
    app.route('/api/words')
        .get(wordController.getWords)
        .put(auth.requiresRole('admin'), wordController.updateWord)
        .post(auth.requiresRole('admin'), wordController.createWord);

    app.route('/api/words/:id')
        .delete(auth.requiresRole('admin'), wordController.deleteWord)
        .get(auth.requiresRole('admin'), wordController.getWord);

    //-- languages
    app.route('/api/languages')
        .get(languageController.getLanguages)
        .put(auth.requiresRole('admin'), languageController.updateLanguage)
        .post(auth.requiresRole('admin'), languageController.createLanguage);

    app.route('/api/languages/:id')
        .delete(auth.requiresRole('admin'), languageController.deleteLanguage)
        .get(auth.requiresRole('admin'), languageController.getLanguage);
    
    //====================================================================
    // PARTIALS ROUTE
    //====================================================================
    app.get('/partials/*', function (req, res) {
        res.render(path.normalize(req.url));
    });
    
    //====================================================================
    // FACEBOOK ROUTES
    //====================================================================
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
		    successRedirect: '/profile',
		    failureRedirect: '/'
		}));

    //====================================================================
    // GOOGLE ROUTES
    //====================================================================
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect: '/profile',
                failureRedirect: '/'
            }));

    //====================================================================
    // TWITTER ROUTES
    //====================================================================
    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
		    successRedirect: '/profile',
		    failureRedirect: '/'
		}));

    // =====================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT)
    // =====================================================================

    // locally --------------------------------
    
    app.post('/connect/local', passport.authenticate('local-connect', {
        successRedirect : '/profile',
        failureRedirect : '/connect/local',
    }));

    // facebook -------------------------------

    app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

    app.get('/connect/facebook/callback',
        passport.authorize('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // twitter --------------------------------

    app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
    
    // google ---------------------------------

    app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

    app.get('/connect/google/callback',
        passport.authorize('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    //====================================================================
    // LOCAL AUTH ROUTES
    //====================================================================
    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    //====================================================================
    // DEFAULT ROUTES
    //====================================================================
    app.all('/api/*', function (req, res) {
        res.send(404);
    });

    app.get('*', function (req, res) {
        res.render('index', {
            currentUser: req.user
        });
    });
}