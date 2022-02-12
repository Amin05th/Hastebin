const mongoose = require('mongoose')

const HastebinSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Document', HastebinSchema)