const discord = require('discord.js')
const { Canvas } = require('canvacord')

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return;

    const target = message.mentions.users.first()
    if (!target) return message.reply({ content: '**Please mention a User to see them under your bed.**' }).then(msg => {
        setTimeout(() => {
            msg.delete()
            message.delete()
        }, 5000);
    })

    try {

        const mainPerson = await Canvas.circle(message.author.displayAvatarURL({ format: 'png' }))
        const targetAvatar = await Canvas.circle(target.displayAvatarURL({ format: 'png' }))

        const image = await Canvas.bed(mainPerson, targetAvatar)

        const attachment = new discord.MessageAttachment(image, 'burn.png')
        message.delete()
        message.channel.send({files: [attachment]})

    } catch (err) {
        console.log(err)
        errorlog(err, message, 'bed')
    }
}

module.exports.help = {
    name: 'bed',
    aliases: [],
    cooldown: 60
}