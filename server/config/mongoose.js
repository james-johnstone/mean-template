var mongoose = require('mongoose');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error ...'));
    db.once('open', function callback() {
        console.log('eto mongo connected!');
    });


    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String,
        email : String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {            
            User.create({email:'test@test', firstName: 'John', lastName: 'Doe', userName: 'Homer' });
            User.create({ firstName: 'Adolph', lastName: 'Lincoln', userName: 'Izzac' });
            User.create({ firstName: 'Dr', lastName: 'Doom', userName: 'Doc' });
        }
    });
}