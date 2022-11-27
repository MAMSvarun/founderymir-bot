const discord = require('discord.js')
const { Canvas } = require('canvacord')

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return;

    let target = message.mentions.users.first()
    if (!target) return message.reply('**Please mention a User to see their worseness.**').then(msg => {
        setTimeout(() => {
            msg.delete()
            message.delete()
        }, 5000);
    })

    try {
        const avatar = target.displayAvatarURL({ format: 'png' })
        const image = await Canvas.hitler(avatar)

        const attachment = new discord.MessageAttachment(image, 'worse.png')
        message.delete()
        return message.channel.send({ files: [attachment] })
    } catch (err) {
        console.log(err)
        errorlog(err, message, 'hitler')
    }


}

module.exports.help = {
    name: 'worse',
    aliases: [],
    cooldown: 60
}