const mongoose = require('mongoose')

const warnSchema = new mongoose.Schema({
    guildId: String,
    userId: String,
    moderatorId: String,
    reason: String,
    timestamp: Number
})

module.exports = mongoose.model('Warn', warnSchema)