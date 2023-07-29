var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Member = new Schema(
	{
		name: { type: String, required: true, trim: true },
		team: { type: mongoose.Types.ObjectId, ref: 'Team', required: true },
		package: {
			type: mongoose.Types.ObjectId,
			ref: 'Package',
			required: true,
		},
		status: { type: Boolean, default: true },
		user: { type: mongoose.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Member', Member);
