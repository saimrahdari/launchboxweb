var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Team = new Schema({
	name: { type: String, required: true, trim: true, unique: true },
	user: { type: mongoose.Types.ObjectId, ref: 'User' },
	package: {
		type: mongoose.Types.ObjectId,
		ref: 'Package',
		required: true,
	},
});

module.exports = mongoose.model('Team', Team);
