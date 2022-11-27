const discord = require('discord.js')
const { Canvas } = require('canvacord')

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return;

    try {

        const avatar = message.author.displayAvatarURL({ format: 'png' })
        const image = await Canvas.facepalm(avatar)

        const attachment = new discord.MessageAttachment(image, 'facepalm.png')
        message.delete()
        return message.channel.send({ files: [attachment] })

    } catch (err) {
        console.log(err)
        errorlog(err, message, 'facepalm')
    }


}

module.exports.help = {
    name: 'facepalm',
    aliases: [],
    cooldown: 60
}