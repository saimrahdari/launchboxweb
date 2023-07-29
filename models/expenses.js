var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Expenses = new Schema(
	{
		vendor: { type: mongoose.Types.ObjectId, ref: 'Vendor' },
		date: { type: Date },
		category: { type: mongoose.Types.ObjectId, ref: 'Category' },
		amount: { type: Number, required: true },
		image: { type: String, default: null },
		description: { type: String, default: '' },
		user: { type: mongoose.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Expenses', Expenses);
