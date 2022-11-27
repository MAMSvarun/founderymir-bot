const discord = require('discord.js')
const { Canvas } = require('canvacord')

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return;

    const target = message.mentions.users.first()
    if (!target) return ({ content: `**Please mention a User to fuse them with you.**` }).then(msg => {
        setTimeout(() => {
            msg.delete()
            message.delete()
        }, 5000);
    })

    try {
        const mainPerson = message.author.displayAvatarURL({ format: 'png' })
        const targetAvatar = target.displayAvatarURL({ format: 'png' })
        const image = await Canvas.fuse(mainPerson, targetAvatar)

        const attachment = new discord.MessageAttachment(image, 'fuse.png')
        const embed = new discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle(`Fusion`)
            .setImage(`attachment://fuse.png`)
            .setFooter(`Can they both return to their normal form?`)
        message.delete()
        message.channel.send({ embeds: [embed], files: [attachment] })
    } catch (err) {
        console.log(err)
        errorlog(err, message, 'fuse')
    }
}

module.exports.help = {
    name: 'fuse',
    aliases: [],
    cooldown: 60
}