var LearningProgress = require('mongoose').model('LearningProgress');

exports.getLearningProgresses = function (req, res) {
    LearningProgress.find({}).populate('word').exec(function (err, collection) {
        res.send(collection);
    });
};


exports.getLearningProgress = function (req, res) {
    LearningProgress.findOne({ id: req.params.id }).exec(function (err, learningProgress) {
        if (err) {
            res.status = 400;
            return res.send({ reason: err.toString() });
        }
        res.send(learningProgress);
    });
}

exports.getLearningProgressByUser = function (req, res) {
    LearningProgress.find({ user: req.params.id }).exec(function (err, collection) {
        if (err) {
            res.status = 400;
            return res.send({ reason: err.toString() });
        }
        res.send(collection);
    });
}

exports.updateLearningProgress = function (req, res) {
    var learningProgressId = req.body._id;
    var learningProgressData = req.body;
    delete learningProgressData._id;
    
    LearningProgress.update({ _id: learningProgressId }, { $set: learningProgressData }, function (err) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(req.learningProgress);
    });
}

exports.createLearningProgress = function (req, res) {
    var learningProgressData = req.body;

    LearningProgress.create(learningProgressData, function (err, learningProgress) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('LearningProgress already created');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(learningProgress);
    });
}

exports.deleteLearningProgress = function (req, res) {

    if (!req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    LearningProgress.remove({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(200);
    });
}