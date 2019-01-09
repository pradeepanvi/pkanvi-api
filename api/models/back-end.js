const mongoose = require('mongoose');

const backEndSchema = mongoose.Schema({
    icon: { type: String },
    text: { type: String }
})

module.exports = mongoose.model('Back', backEndSchema);