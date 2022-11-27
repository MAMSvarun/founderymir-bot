const discord = require('discord.js')
const { Canvas } = require('canvacord')

module.exports.run = async (Client, message, args, prefix) => {
    if (!message.content.startsWith(prefix)) return;

    let target = message.mentions.users.first()
    // if(message.mentions.roles.first()) return message.reply({content: `**Mention a User, not Role.**`})
    if (!target) target = message.author

    const avatar = target.displayAvatarURL({ format: 'png' })
    const image = await Canvas.greyscale(avatar)

    const attachment = new discord.MessageAttachment(image, 'greyscale.png')
    message.delete()
    return message.channel.send({files: [attachment]})


}

module.exports.help = {
    name: 'greyscale',
    aliases: [],
    cooldown: 60
}