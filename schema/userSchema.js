const mongoose = require(`mongoose`)

const userSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        requried: true
    },

    softbanned: {
        type: Boolean,
        default: false
    },

    muted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model(`Users`, userSchema)