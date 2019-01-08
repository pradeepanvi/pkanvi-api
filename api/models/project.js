const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    text: { type: String }
});

module.exports = mongoose.model('Project', projectSchema);