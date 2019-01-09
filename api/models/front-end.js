const mongoose = require('mongoose');

const frontEndSchema = mongoose.Schema({
    icon: { type: String },
    text: { type: String }
})

module.exports = mongoose.model('Front', frontEndSchema);