const discord = require('discord.js')
const { HangMan } = require ('djs-games')

module.exports.run = async(Client, message, args, prefix) => {
    const mode = [
        'sport', 'coding', 'nature', 'popular game', 'phone brand', 'color', 'camping', 'music instrument'
    ]

    const option = mode[Math.floor(Math.random * mode.length)]
    const game = new HangMan({
        message: message,
        theme: option, // 'sport', 'coding', 'nature', 'popular game', 'phone brand', 'color', 'camping', 'music instrument'
        hangManHat: '🎓',
        hangManHead: '🙉',
        hangManShirt: '👚 ',
        hangManPants: '👖 ',
        hangManBoots: '👟👟',
      })
      game.start()
}

module.exports.help = {
    name: 'hangman',
    aliases: []
}