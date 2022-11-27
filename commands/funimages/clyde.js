const discord = require('discord.js')
const { Canvas } = require('canvacord')

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return;

    const text = args.slice(0).join(' ')
    if (message.mentions.users.first() || message.mentions.roles.first()) return message.reply({ content: `**You need to type something, don't mention someone.**` }).then(msg => {
        setTimeout(() => {
            msg.delete()
            message.delete()
        }, 5000);
    })
    if (!text) return message.reply({ content: '**Please type something to make Clyde Bot say it!**' }).then(msg => {
        setTimeout(() => {
            msg.delete()
            message.delete()
        }, 5000);
    })

    try {

        const image = await Canvas.clyde(text)

        const attachment = new discord.MessageAttachment(image, 'clyde.png')
        message.delete()
        message.channel.send({ files: [attachment] })

    } catch (err) {
        console.log(err)
        errorlog(err, message, 'clyde')
    }

}

module.exports.help = {
    name: 'clyde',
    aliases: [],
    cooldown: 60
}