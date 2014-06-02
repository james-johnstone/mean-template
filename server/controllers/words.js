var Word = require('mongoose').model('Word');
var Language = require('mongoose').model('Language');


exports.getWords = function (req, res) {
    Word.find({}).populate('rootLanguage').exec(function (err, collection) {
        res.send(collection);
    });
};

exports.getWord = function (req, res) {
    Word.findOne({ _id: req.params.id }).exec(function (err, word) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(word);
    });
};

exports.updateWord = function (req, res) {
    // pull object id out of the req.body so we don't throw it to mongo update
    var wordId = req.body._id;
    var wordData = req.body;
    delete wordData._id;

    if (!req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    Word.update({ _id: wordId }, { $set: wordData }, function (err) {
        if (err) {            
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(req.word);
    });
};

exports.createWord = function (req, res) {

    Word.create(req.body, function (err, word) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Word already created');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(word);
    });
};

exports.deleteWord = function (req, res) {

    Word.remove({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(200);
    });
};