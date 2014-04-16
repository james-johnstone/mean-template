var Language = require('mongoose').model('Language');

exports.getLanguages = function (req, res) {
    Language.find({}).exec(function (err, collection) {
        res.send(collection);
    });
};