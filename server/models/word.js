var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wordSchema = new Schema({
    word: { type: String, required: '{PATH} is required', unique: true },
    synopsis: String,
    history: String,
    rootLanguage: { type: mongoose.Schema.ObjectId, ref: 'Language' }
});

var Word = mongoose.model('Word', wordSchema);
var language_id = mongoose.Types.ObjectId('534eae35b3ba2d00376ec445')

function createDefaultWords() {
    Word.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            Word.create({ word: 'penne', history: 'lorum ipsum.....', rootLanguage: language_id });
        }
    });
}

exports.createDefaultWords = createDefaultWords