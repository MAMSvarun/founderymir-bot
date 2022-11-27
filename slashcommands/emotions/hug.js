let discord = require(`discord.js`)
let wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {
    try {

        let user = interaction.options.getMember(`user`)

        let members = interaction.guild.members.cache.random()


        if (!user) user = members

        hugs = [
            'https://c.tenor.com/9e1aE_xBLCsAAAAC/anime-hug.gif',
            'https://c.tenor.com/Ct4bdr2ZGeAAAAAC/teria-wang-kishuku-gakkou-no-juliet.gif',
            'https://c.tenor.com/z2QaiBZCLCQAAAAC/hug-anime.gif',
            'https://c.tenor.com/xgVPw2QK5n8AAAAC/sakura-quest-anime.gif',
            'https://c.tenor.com/DVOTqLcB2jUAAAAC/anime-hug-love.gif',
            'https://c.tenor.com/2bWwi8DhDsAAAAAC/hugs-and-love.gif',
            'https://c.tenor.com/Il96nllswXIAAAAC/mikasa-ackerman.gif',
            'https://c.tenor.com/UhcyGsGpLNIAAAAC/hug-anime.gif',
            'https://c.tenor.com/F1VUry86n7kAAAAC/hug-anime.gif',
            'https://c.tenor.com/2u67zOB43esAAAAC/cute-anime.gif',
            'https://c.tenor.com/8ln6Z1e-FVYAAAAM/nagumi-koushi-hozumi-serene.gif',
            'https://c.tenor.com/8V-2mCzxzn0AAAAd/anime-kiss-romance.gif',
            'https://c.tenor.com/lK1PF-Xv1O4AAAAC/yato-anime-noragami.gif',
            'https://c.tenor.com/vtOmnXkckscAAAAC/kiss.gif',
            'https://c.tenor.com/Fyq9izHlreQAAAAC/my-little-monster-haru-yoshida.gif',
            `https://c.tenor.com/GHeYe2X2sdsAAAAd/armin-eren.gif`,
            `https://c.tenor.com/l3uEolrOhqEAAAAC/eren-yeager-mikasa-ackerman.gif`,
            `https://c.tenor.com/Pc0J3qy-MMIAAAAC/anime-hug.gif`,
            `https://c.tenor.com/vBzOvBQ5MugAAAAC/citrus-harumi.gif`,
            `https://c.tenor.com/Vq7OU0fL8xAAAAAd/grisha-zeke.gif`
        ]

        let embed = new discord.MessageEmbed()
            .setColor(`DARK_VIVID_PINK`)
            .setDescription(`**${interaction.user.username}** hugged **${user.user.username}** <:hug:878143007856136272>`)
            .setImage(hugs[Math.floor(Math.random() * hugs.length)])

        await interaction.deferReply()
        await wait(1000)
        await interaction.editReply({ embeds: [embed] })



    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `hug`)
    }

}

module.exports.help = {
    name: `hug`
}
