const discord = require('discord.js')
const Canvas = require('canvas')
const canvacord = require('canvacord')

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return

    const admins = message.guild.roles.cache.find((r) => r.name == 'Premier[Admin]')
    const mods = message.guild.roles.cache.find((r) => r.name == 'Squad Leaders[Mod]')


    try {
        const canvas = Canvas.createCanvas(700, 250)
        const ctx = canvas.getContext("2d")

     


        let target = message.mentions.users.first()
        if(!target) return message.reply({content: `**Please mention a User to ship you with them.**`}).then(msg => {
            setTimeout(() => {
                msg.delete()
                message.delete()
            }, 5000);
        })
        if(target.id == message.author.id ) return message.reply({content: `**You can't ship you with yourself.**`}).then(msg => {

            setTimeout(() => {

                msg.delete()

                message.delete()

            }, 5000);

        })


        message.delete()
        const bg = await Canvas.loadImage("https://i.imgur.com/4r2cBtF.png")
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }))
        ctx.drawImage(avatar, 100, 25, 200, 200)

        const targetAvatar = await Canvas.loadImage(target.displayAvatarURL({ format: 'png' }))
        ctx.drawImage(targetAvatar, 400, 25, 200, 200)

        const heart = await Canvas.loadImage('https://i.imgur.com/gwMqqHm.png')
        const broken = await Canvas.loadImage('https://i.imgur.com/B2xqOVa.png')
        const random = Math.floor(Math.random() * 99) + 1

        const firstuserSliced = message.author.username.slice(0, message.author.username.length / 2)
        const seconduserSliced = target.username.slice(target.username.length / 2)

        if (random >= 50) {
            ctx.drawImage(heart, 250, 31, 200, 200)
            const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'love.png')
            const embed = new discord.MessageEmbed()
                .setTitle(`Ooo Ship Ship!`)
                .setDescription(`**${message.author.username}** + **${target.username}** = ${firstuserSliced}${seconduserSliced} __${random}% :heart:__ `)
                .setImage('attachment://love.png')
                .setColor('GREEN')
                .setFooter('THIS SHIP MAY SAIL 🙂!')
            return message.channel.send({ embeds: [embed], files: [attachment] })

        } else {

            ctx.drawImage(broken, 250, 31, 200, 200)
            const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'love.png')
            const embed = new discord.MessageEmbed()
                .setTitle(`Ooo Ship Ship!`)
                .setDescription(`**${message.author.username}** + **${target.username}** = ${firstuserSliced}${seconduserSliced} __${random}% :broken_heart:__ `)
                .setImage('attachment://love.png')
                .setColor('RED')
                .setFooter('This ship may sink...')
            return message.channel.send({ embeds: [embed], files: [attachment] })

        }

    } catch (err) {
        console.log(err)
        errorlog(err, message, 'ship')
    }

    // if(target.id == message.author.id) {

    // }


}

module.exports.help = {
    name: 'ship',
    aliases: [],
    cooldown: 60
}
