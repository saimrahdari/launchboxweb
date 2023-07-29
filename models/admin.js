var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var Admin = new Schema({
	email: { type: String, default: '', unique: true },
});

Admin.plugin(passportLocalMongoose, {
	usernameField: 'email',
});

module.exports = mongoose.model('Admin', Admin);
