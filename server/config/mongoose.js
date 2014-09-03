var mongoose                = require('mongoose'),
    userModel               = require('../models/user'),
    wordModel               = require('../models/word'),
    languageModel           = require('../models/language'),
    learningProgressModel   = require('../models/learningProgress');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error ...'));
    db.once('open', function callback() {
        console.log('eto mongo connected!');
    });

    userModel.createDefaultUsers();
};

