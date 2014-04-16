var mongoose = require('mongoose');

var wordSchema = mongoose.Schema({
    word: { type: String, required: '{PATH} is required', unique: true },
    synopsis: String,
    history: String,
    rootLanguage: mongoose.Schema.ObjectId
});

var Word = mongoose.model('Word', wordSchema);

function createDefaultWords() {
    Word.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            Word.create({ word: 'pen', synopsis: 'comes from the french penne', history: 'lorum ipsum.....', rootLanguage: mongoose.Schema.ObjectId('534eae35b3ba2d00376ec445') });
        }
    });
}

exports.createDefaultWords = createDefaultWords