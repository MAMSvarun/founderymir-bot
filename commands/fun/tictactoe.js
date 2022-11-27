const discord = require('discord.js')
const { TicTacToe } = require('djs-games')

module.exports.run = async(Client, message, args, prefix) => {
    const opponent = message.mentions.users.first()
    if(!opponent) return message.reply('**Please mention a user to play with them.**').then(msg => {
        setTimeout(() => {
            msg.delete()
            message.delete()
        }, 5000)
    })

    if(opponent.bot) return message.reply(`**You can't play with bots.`).then(msg => {
        setTimeout(() => {
            msg.delete()
            message.delete()
        }, 5000)
    })
    const game = new TicTacToe({
        opponent: opponent,
        message: message,
        xEmoji: '❌', // The Emote for X
        oEmoji: '0️⃣', // The Emote for O
        xColor: 'PRIMARY',
        oColor: 'PRIMARY', // The Color for O
        embedDescription: 'Tic Tac Toe', // The Description of the embed
      })
      game.start()
}

module.exports.help = {
    name: 'tictactoe',
    aliases: ['ttt']
}
