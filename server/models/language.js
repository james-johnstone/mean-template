var mongoose = require('mongoose');

var languageSchema = mongoose.Schema({
    name: { type: String, required: '{PATH} is required', unique: true },
    languageCategory: String
});

var Language = mongoose.model('Language', languageSchema);

function createDefaultLanguages() {
    Language.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            Language.create({ name: 'french', languageCategory: 'romantics' });
            Language.create({ name: 'latin', languageCategory: 'ancient' });
        }
    });
}

exports.createDefaultLanguages = createDefaultLanguages