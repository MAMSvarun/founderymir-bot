const discord = require('discord.js')
const { Canvas } = require('canvacord');
const { greyscale } = require('canvacord/src/Canvacord');

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return;

    let target = message.mentions.users.first()
    if (!target) target = message.author

    try {
        const avatar = target.displayAvatarURL({ format: 'png' })
        const image = await Canvas.jail(avatar, greyscale)

        const attachment = new discord.MessageAttachment(image, 'jail.png')
        message.delete()
        return message.channel.send({ files: [attachment] })
    } catch (err) {
        console.log(err)
        errorlog(err, message, 'jail')
    }



}

module.exports.help = {
    name: 'jail',
    aliases: [],
    cooldown: 60
}