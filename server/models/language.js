var mongoose = require('mongoose');

var languageSchema = mongoose.Schema({
    name: { type: String, required: '{PATH} is required', unique: true },
    languageCategory: String
});

var Language = mongoose.model('Language', languageSchema);