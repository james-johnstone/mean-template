var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wordSchema = new Schema({
    word: { type: String, required: '{PATH} is required', unique: true },
    synopsis: String,
    history: String,
    rootLanguage: { type: mongoose.Schema.ObjectId, ref: 'Language' }
});

var Word = mongoose.model('Word', wordSchema);