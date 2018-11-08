const mongoose = require('mongoose');

const quatationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    detail: { type: mongoose.Schema.Types.ObjectId, ref: 'Detail', required: true },
    product : { type: String, required: true },
    quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('quatation', quatationSchema);