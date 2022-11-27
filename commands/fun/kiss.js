const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix) => {
    if (!message.content.startsWith(prefix)) return;

    const target = message.mentions.users.first()
    if (target == message.author) return message.reply({content: '**You cannot kiss yourself!**'}).then(msg => {
        setTimeout(() => {
            msg.delete()
            message.delete()
        }, 5000);
    })

    try {

        if (target) {
            kisses = [
                'https://c.tenor.com/I8kWjuAtX-QAAAAC/anime-ano.gif',
                'https://c.tenor.com/dJU8aKmPKAgAAAAd/anime-kiss.gif',
                'https://c.tenor.com/G954PGQ7OX8AAAAd/cute-urara-shiraishi-anime.gif',
                'https://c.tenor.com/hK8IUmweJWAAAAAC/kiss-me-%D0%BB%D1%8E%D0%B1%D0%BB%D1%8E.gif',
                'https://c.tenor.com/VTvkMN6P648AAAAM/anime-kiss.gif',
                'https://c.tenor.com/e6cYiAPPCq4AAAAM/anime-kissing.gif',
                'https://c.tenor.com/0mdCwkmGD1oAAAAC/kiss-love.gif',
                'https://c.tenor.com/Ze6FyEgy4WAAAAAM/kiss-anime.gif',
                'https://c.tenor.com/OPUTh1nbf7YAAAAC/anime-kiss.gif',
                'https://c.tenor.com/_6hgYIXDWpUAAAAM/kiss-anime.gif',
                'https://c.tenor.com/0E_odieuKmwAAAAM/anime-zero.gif'
            ]




            const kissembed = new discord.MessageEmbed()
                .setColor('DARK_VIVID_PINK')
                .setTitle(`( ͡° ͜ʖ ͡°)`)
                .setDescription(`${message.author} kissed ${target}:heart:`)
                .setImage(kisses[Math.floor(Math.random() * kisses.length)])
                .setFooter(`Hope ${target.username} won't slap ${message.author.username}`)
            message.channel.send({ embeds: [kissembed] })
            message.delete()
        } else {
            message.reply({ content: '**Please mention a User to Kiss them(>_<).**' }).then(msg => {
                setTimeout(() => {
                    msg.delete()
                    message.delete()
                }, 5000);
            })
        }

    } catch (err) {
        console.log(err)
        errorlog(err, message, 'kiss')
    }
}

module.exports.help = {
    name: 'kiss',
    aliases: [],
    cooldown: 60
}