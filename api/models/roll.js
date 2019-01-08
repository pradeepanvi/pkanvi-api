const mongoose = require('mongoose');

const rollSchema = mongoose.Schema({
    icon: { type: String },
    head: { type: String },
    text: { type: String }
});

module.exports = mongoose.model('Roll', rollSchema);