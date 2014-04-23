var User = require('mongoose').model('User'),
    crypto = require('../utilities/crypto');

exports.getUsers = function (req, res) {
    User.find({}).exec(function (err, collection) {
        res.send(collection);
    });
};

exports.getUser = function (req, res) {
    User.findOne({ _id: req.params.id }).exec(function (err, user) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(user);
    });
};

exports.createUser = function (req, res, next) {
    var userData = req.body;
    userData.local.salt = crypto.createSalt();
    userData.local.hashedPassword = crypto.hashPassword(userData.local.password, userData.local.salt);

    User.create(userData, function (err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Username already registered');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            res.send(user);
        });
    });
};

exports.updateUser = function (req, res) {
    console.log(req.body)
    var userData = req.body;
    var userID = userData._id;
    delete userData._id;
     
    if (req.user.local.email !== userData.local.email && !req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    // user profile update must specifically reference nested object properties.
    if (!!userData.local.hashedPassword) {
        User.update({ _id: userID }, {
            $set:{
                'local.email': userData.local.email,
                'local.firstName': userData.local.firstName,
                'local.lastName': userData.local.lastName,
                'local.userName': userData.local.userName,
            }                
        }, function (err) {
            if (err) {
                if (err.toString().indexOf('E11000') > -1) {
                    err = new Error('Username already registered');
                }
                res.status(400);
                return res.send({ reason: err.toString() });
            }
            res.send(req.user);
        });
    }
    else {
        User.update({ _id: userID }, { $set: userData }, function (err) {
            if (err) {
                if (err.toString().indexOf('E11000') > -1) {
                    err = new Error('Username already registered');
                }
                res.status(400);
                return res.send({ reason: err.toString() });
            }
            res.send(req.user);
        });
    }
};