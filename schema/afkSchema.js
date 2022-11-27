const mongoose = require(`mongoose`)

const afkSchema = new mongoose.Schema({
    
    userId: {
        type: String,
        required: true
    },

    guildId: {
        type: String,
        required: true
    },

    afk: {
        type: Boolean,
        default: false
    },

    username: {
        type: String,
        default: null
    },

    reason: {
        type: String,
        default: `Not Specified`
    }
})

module.exports = mongoose.model(`AFKs`, afkSchema)