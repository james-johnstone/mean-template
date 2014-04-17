var Language = require('mongoose').model('Language');

exports.getLanguages = function (req, res) {
    Language.find({}).exec(function (err, collection) {
        res.send(collection);
    });
};

exports.getLanguage = function (req, res) {
    Language.findOne({ _id: req.params.id }).exec(function (err, language) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(language);
    });
};

exports.updateLanguage = function (req, res) {
    var languageId = req.body._id;
    var languageData = req.body;
    delete languageData._id;

    if (!req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    Language.update({ _id: languageId }, { $set: languageData }, function (err) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(req.language);
    });
}

exports.createLanguage = function (req, res) {
    var languageData = req.body;

    Language.create(languageData, function (err, language) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Language already created');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(language);
    });
}

exports.deleteLanguage = function (req, res) {

    Language.remove({ _id: req.params.id }, function (err) {
        if (err) {            
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(200);
    });
}