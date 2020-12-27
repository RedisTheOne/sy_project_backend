const mongoose = require('mongoose')

const schema = mongoose.Schema({
    header: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    donor_username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product', schema)