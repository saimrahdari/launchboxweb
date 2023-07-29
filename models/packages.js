var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Package = new Schema(
	{
		name: { type: String, required: true, trim: true, unique: true },
		price: { type: Number, required: true },
		user: { type: mongoose.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Package', Package);
