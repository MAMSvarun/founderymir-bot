const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return

    try {

        let clap = args.slice(0).join('').split('').join(':clap:')
        if(message.mentions.users.first() || message.mentions.roles.first()) return message.reply({content: `**You need to type something, don't mention someone.**`}).then(msg => {
            setTimeout(() => {
                msg.delete()
                message.delete()
            }, 5000);
        })
        if (!clap) return message.reply({content: '**Hope you can type a word with this command to show something.**'}).then(msg => {
            setTimeout(() => {
                msg.delete()
                message.delete()
            }, 5000);
        })
        if (clap.length < 1) return message.reply({content: '**I need a word, not letter.**'}).then(msg => {
            setTimeout(() => {
                msg.delete()
                message.delete()
            }, 5000);
        })
        if (clap.length > 500) return message.reply({content: 'Oi Oi Oi, send something smaller. Not this big, you will kill me.'}).then(msg => {
            setTimeout(() => {
                msg.delete()
                message.delete()
            }, 5000);
        })
        message.channel.send({ content: clap })
        message.delete()

    } catch (err) {
        console.log(err)
        errorlog(err, message, 'clap')

    }
}

module.exports.help = {
    name: 'clap',
    aliases: [],
    cooldown: 15
}