var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var learningProgressSchema = new Schema({
    word: { type: mongoose.Schema.ObjectId, ref: 'Word' },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    timesSeen: Number,
    correctAnswers: Number,    
});

var LearningProgress = mongoose.model('LearningProgress', learningProgressSchema);