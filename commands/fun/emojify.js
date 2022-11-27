const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix, errorlog) => {

    if (!message.content.startsWith(prefix)) return

    try {

        if (!args.length) return message.reply({content: '**Please type something to emojify them.**'}).then(msg => {
            setTimeout(() => {
                msg.delete()
                message.delete()
            }, 5000);
        })
        if(message.mentions.users.first() || message.mentions.roles.first()) return message.reply({content: `**You need to type something, don't mention someone.**`}).then(msg => {
            setTimeout(() => {
                msg.delete()
                message.delete()
            }, 5000);
        })
        const specialCodes = {
            '0': ':zero:',
            '1': ':one:',
            '2': ':two:',
            '3': ':three:',
            '4': ':four:',
            '5': ':five:',
            '6': ':six:',
            '7': ':seven:',
            '8': ':eight:',
            '9': ':nine:',
            '#': ':hash:',
            '*': ':asterisk:',
            '?': ':grey_question:',
            '!': ':grey_exclamation:',
            ' ': '   '
        }
        const text = args.join(" ").toLowerCase().split('').map(letter => {
            if (/[a-z]/g.test(letter)) {
                return `:regional_indicator_${letter}:`
            } else if (specialCodes[letter]) {
                return `${specialCodes[letter]}`
            }
            return letter;
        }).join('');

        message.channel.send({ content: text })
        message.delete()

    } catch (err) {
        console.log(err)
        errorlog(err, message, 'emojify')
    }

}


module.exports.help = {
    name: 'emojify',
    aliases: [],
    cooldown: 15
}