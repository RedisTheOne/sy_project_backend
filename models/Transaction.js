const mongoose = require('mongoose')

const schema = mongoose.Schema({
    product_header: {
        type: String,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    },
    donor_username: {
        type: String,
        required: true
    },
    user_number: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Transaction', schema)