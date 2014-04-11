var auth = require('./auth');

module.exports = function (app) {

    app.get('/partials/*', function (req, res) {
        res.render('partials/' + req.params);
    });

    app.post('/login', auth.authenticate);

    app.get('*', function (req, res) {
        res.render('index');
    });
} 