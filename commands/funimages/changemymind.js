const discord = require('discord.js')
const { Canvas } = require('canvacord')

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return;

    const text = args.slice(0).join(' ')
    if (message.mentions.users.first() || message.mentions.roles.first()) return message.reply({ content: `**You need to type something, don't mention users or roles.**` }).then(msg => {
        setTimeout(() => {
            msg.delete()
            message.delete()
        }, 5000);
    })
    if (!text) return message.reply({ content: '**Please type something to change your mind!**' }).then(msg => {
        setTimeout(() => {
            msg.delete()
            message.delete()
        }, 5000);
    })

    try {

        const image = await Canvas.changemymind(text)

        const attachment = new discord.MessageAttachment(image, 'changemymind.png')
        message.channel.send({ files: [attachment] })

    } catch (err) {
        console.log(err)
        errorlog(err, message, 'changemymind')
    }
}

module.exports.help = {
    name: 'changemymind',
    aliases: [],
    cooldown: 60
}