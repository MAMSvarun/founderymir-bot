const discord = require('discord.js')
const djsgames = require('djs-games')

module.exports.run = async(Client, message, args, prefix, errorlog) => {
    if(!message.content.startsWith(prefix)) return

    const game = new djsgames.FastTyper({message: message})

    game.start()
}

module.exports.help = {
    name: 'fasttype',
    aliases: []
}