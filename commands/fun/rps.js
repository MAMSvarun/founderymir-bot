const discord = require(`discord.js`)
const { RockPaperScissors } = require('djs-games')

module.exports.run = async(Client, message, args, prefix) => {
    const game = new RockPaperScissors({
        message: message,
      })
      game.start()

}

module.exports.help = {
    name: `rps`,
    aliases: []
}