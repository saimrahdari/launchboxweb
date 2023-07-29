var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vendor = new Schema(
	{
		name: { type: String, required: true, trim: true, unique: true },
		user: { type: mongoose.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Vendor', Vendor);
