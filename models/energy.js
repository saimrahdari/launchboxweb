var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Energy = new Schema(
	{
		reading: { type: Number, required: true },
		date: { type: Date },
		user: { type: mongoose.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Energy', Energy);
