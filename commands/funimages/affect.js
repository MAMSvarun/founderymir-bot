const discord = require('discord.js')
const { Canvas } = require('canvacord')

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return;

    let target = message.mentions.users.first()
    if (!target) return message.reply({content: '**Please mention a User to see how people got affected.**'}).then(msg => {
        setTimeout(() => {
            msg.delete()
            message.delete()
        }, 5000);
    })
    

    try {
        const avatar = target.displayAvatarURL({ format: 'png' })
        const image = await Canvas.affect(avatar)

        const attachment = new discord.MessageAttachment(image, 'affect.png')
        message.channel.send({ files: [attachment] })
        return message.delete()
    } catch (err) {
        console.log(err)
        errorlog(err, message, 'affect')
    }


}

module.exports.help = {
    name: 'affect',
    aliases: [],
    cooldown: 60
}