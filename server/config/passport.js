var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');

module.exports = function () {

    passport.use('local-signup',new LocalStrategy({ usernameField: 'email', passwordField: 'password' },

        function (email, password, done) {

            User.findOne({ 'local.email': email }).exec(function (err, user) {
                if (user && user.authenticate(password)) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }
            });
        }));



    passport.serializeUser(function (user, done) {
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({ _id: id }).exec(function (err, user) {
            if (user) {
                //delete user.local.salt;
                //delete user.local.hashedPassword;

                return done(err, user);
            }
            else {
                return done(err, false);
            }
        });
    })
}