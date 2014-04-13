var mongoose = require('mongoose'),
    crypto = require('crypto');

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
        email: String,
        salt: String,
        hashedPassword: String,
        isAdmin: Boolean
    });

    userSchema.methods = {
        authenticate: function (password) {
            return hashPassword(password, this.salt) === this.hashedPassword ;
        }
    };

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPassword('test', salt);

            User.create({email:'jamie@test', firstName: 'Jamie', lastName: 'Johnstone', userName: 'Jamie', salt:salt, hashedPassword:hash });
            User.create({ firstName: 'Adolph', lastName: 'Lincoln', userName: 'Izzac' });
            User.create({ firstName: 'Dr', lastName: 'Doom', userName: 'Doc' });
        }
    });
}

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPassword(password, salt) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(password).digest('hex');
}