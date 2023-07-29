var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PettyCash = new Schema(
	{
		amount: { type: Number, required: true },
		date: { type: Date },
		user: { type: mongoose.Types.ObjectId, ref: 'User' },
		message: { type: String, default: null },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('PettyCash', PettyCash);
