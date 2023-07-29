var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Invoice = new Schema(
	{
		team: { type: mongoose.Types.ObjectId, ref: 'Team', required: true },
		members: { type: Number, default: 0 },
		date: { type: Date },
		rate: { type: Number, default: 0 },
		tax: { type: Boolean, default: false },
		paid: { type: Boolean, default: true },
		discount: { type: Number, default: 0 },
		total: { type: Number, default: 0 },
		user: { type: mongoose.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Invoice', Invoice);
