let discord = require(`discord.js`)
let wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {
    try {

        let user = interaction.options.getMember(`user`)

        let members = interaction.guild.members.cache.random()

        if(!user) user = members

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
            'https://c.tenor.com/0E_odieuKmwAAAAM/anime-zero.gif',
            'https://c.tenor.com/VTvkMN6P648AAAAC/anime-kiss.gif',
            `https://c.tenor.com/YTsHLAJdOT4AAAAC/anime-kiss.gif`
        ]

        let embed = new discord.MessageEmbed()
            .setColor(`DARK_VIVID_PINK`)
            .setTitle(`( ͡° ͜ʖ ͡°)`)
            .setDescription(`**${interaction.user.username}** kissed **${user.user.username}** :heart:`)
            .setImage(kisses[Math.floor(Math.random() * kisses.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({embeds: [embed]})



    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `kiss`)
    }

}

module.exports.help = {
    name: `kiss`
}