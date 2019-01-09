const mongoose = require('mongoose');

const extraSchema = mongoose.Schema({
    number: { type: Number },
    text: { type: String }
});

module.exports = mongoose.model('Extra', extraSchema);