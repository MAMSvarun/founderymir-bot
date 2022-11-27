let discord = require(`discord.js`)
let Canvas = require(`canvas`)
let wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try {

        let user1 = interaction.options.getMember(`user1`)
        if (!user1) user1 = interaction.user

        let user2 = interaction.options.getMember(`user2`)
        let members = interaction.guild.members.cache.random()
        if (!user2) user2 = members

        const canvas = Canvas.createCanvas(700, 250)
        const ctx = canvas.getContext("2d")

        const bg = await Canvas.loadImage("https://i.imgur.com/4r2cBtF.png")
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

        const user1Avatar = await Canvas.loadImage(user1.user.displayAvatarURL({ format: `png` }))
        ctx.drawImage(user1Avatar, 100, 25, 200, 200)

        const user2Avatar = await Canvas.loadImage(user2.user.displayAvatarURL({ format: `png` }))
        ctx.drawImage(user2Avatar, 400, 25, 200, 200)

        const heart = await Canvas.loadImage('https://i.imgur.com/gwMqqHm.png')
        const broken = await Canvas.loadImage('https://i.imgur.com/B2xqOVa.png')
        const random = Math.floor(Math.random() * 99) + 1

        const firstuserSliced = user1.user.username.slice(0, user1.user.username.length / 2)
        const seconduserSliced = user2.user.username.slice(user2.user.username.length / 2)

        if (random >= 50) {
            ctx.drawImage(heart, 250, 31, 200, 200)
            const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'love.png')
            const embed = new discord.MessageEmbed()
                .setTitle(`Ooo Ship Ship!`)
                .setDescription(`**${user1.user.username}** + **${user2.user.username}** = **${firstuserSliced}${seconduserSliced}** **${random}%** :heart: `)
                .setImage('attachment://love.png')
                .setColor('GREEN')
                .setFooter('THIS SHIP MAY SAIL 🙂!')

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed], files: [attachment] })

        } else {

            ctx.drawImage(broken, 250, 31, 200, 200)
            const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'love.png')
            const embed = new discord.MessageEmbed()
                .setTitle(`Ooo Ship Ship!`)
                .setDescription(`**${user1.user.username}** + **${user2.user.username}** = **${firstuserSliced}${seconduserSliced} ${random}%** :broken_heart: `)
                .setImage('attachment://love.png')
                .setColor('RED')
                .setFooter('This ship may sink...')

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed], files: [attachment] })

        }

    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `ship`)
    }

}

module.exports.help = {
    name: `ship`
}