const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullname: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        maxlength: 10
    },
    streetadd1: {
        type: String,
        required: true
    },
    streetadd2: {
        type: String,
    },
    landmark: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        maxlength: 10,
        required: true
    },
    addresstype: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Address', addressSchema);