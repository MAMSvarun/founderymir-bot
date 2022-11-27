const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix) => {
    if (!message.content.startsWith(prefix)) return

    let user = message.mentions.users.first()
    if (user == message.author) return message.reply({content: '**You cannot hug yourself.**'}).then(msg => {
        setTimeout(() => {
            msg.delete()
            message.delete()
        }, 5000);
    })

    try {

        if (user) {
            hugs = [
                'https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif',
                'https://c.tenor.com/Ct4bdr2ZGeAAAAAC/teria-wang-kishuku-gakkou-no-juliet.gif',
                'https://c.tenor.com/z2QaiBZCLCQAAAAC/hug-anime.gif',
                'https://c.tenor.com/xgVPw2QK5n8AAAAC/sakura-quest-anime.gif',
                'https://c.tenor.com/DVOTqLcB2jUAAAAC/anime-hug-love.gif',
                'https://c.tenor.com/2bWwi8DhDsAAAAAC/hugs-and-love.gif',
                'https://c.tenor.com/Il96nllswXIAAAAC/mikasa-ackerman.gif',
                'https://c.tenor.com/UhcyGsGpLNIAAAAC/hug-anime.gif',
                'https://c.tenor.com/F1VUry86n7kAAAAC/hug-anime.gif'
            ]


            const embed = new discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`${message.author.username} hugged ${user.username} :heart:`)
                .setImage(hugs[Math.floor(Math.random() * hugs.length)])
                .setTimestamp()

            message.channel.send({embeds: [embed]})
            message.delete()

        } else {
            message.reply({content: '**Please mention a User this time.**'}).then(msg => {
                setTimeout(() => {
                    msg.delete()
                    message.delete()
                }, 5000);
            })
        }

    } catch (err) {
        console.log(err)
        errorlog(err, message, 'hug')
    }
}

module.exports.help = {
    name: 'hug',
    aliases: [],
    cooldown: 60
}