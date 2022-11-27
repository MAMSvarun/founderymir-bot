const discord = require('discord.js')
const { Canvas } = require('canvacord');

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return;

    let target = message.mentions.users.first()
    if (!target) target = message.author
    try {

        const avatar = target.displayAvatarURL({ format: 'png' })
        const image = await Canvas.beautiful(avatar)

        const attachment = new discord.MessageAttachment(image, 'beautiful.png')
        message.delete()
        return message.channel.send({ files: [attachment] })

    } catch (err) {
        console.log(err)
        errorlog(err, message, 'beautiful')
    }

}

module.exports.help = {
    name: 'beautiful',
    aliases: [],
    cooldown: 60
}