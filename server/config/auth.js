var passport = require('passport');

exports.authenticate = function (req, res, next) {

    req.body.email = (req.body.email || "").toLowerCase();

    var auth = passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.send({ success: false });
        }
        else {
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                res.send({ success: true, user: user });
            });
        }
    });
    auth(req, res, next);
};

exports.requiresApiLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.status(403);
        res.end();
    }
    else {
        next();
    }
};

exports.requiresRole = function (role) {
    return function (req, res, next) {
        if (!req.isAuthenticated() || req.user.local.roles.indexOf(role) === -1) {
            res.status(403);
            res.end();
        }
        else {
            next();
        }
    };
};

exports.config = {
    'facebookAuth': {
        'clientID': '674095555959783',
        'clientSecret': '',
        'callbackURL': 'http://desolate-coast-5998.herokuapp.com/auth/facebook/callback'
    },

    'twitterAuth': {
        'consumerKey': '5uJ8VhXzLmKmkdkhfmJZvWDW4',
        'consumerSecret': '',
        'callbackURL': 'http://desolate-coast-5998.herokuapp.com/auth/twitter/callback'
    },

    'googleAuth': {
        'clientID': '718084310608-qhrf5gb57jcj0kucnk6777cc5sn5lnte.apps.googleusercontent.com',
        'clientSecret': '',
        'callbackURL': 'http://desolate-coast-5998.herokuapp.com/auth/google/callback'
    }
};