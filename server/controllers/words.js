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