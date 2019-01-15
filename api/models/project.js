const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name: { type: String },
    thumbImage: { type: String },
    mainImage: { type: String },
    slide1Image: { type: String },
    slide2Image: { type: String },
    category: { type: String },
    technology: { type: Array },
    client: { type: String },
    detail: { type: String },
    rolls: { type: String },
});

module.exports = mongoose.model('Project', projectSchema);