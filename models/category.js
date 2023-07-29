var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = new Schema({
	name: { type: String, required: true, trim: true, unique: true },
	user: { type: mongoose.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Category', Category);
