const discord = require(`discord.js`)
const wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {


    try {

        let user = interaction.options.getMember(`user`)

        dance = [
            `https://c.tenor.com/GOYRQva4UeoAAAAd/anime-dance.gif`,
            `https://c.tenor.com/4LuXIliXOR4AAAAC/nae-nae-anime.gif`,
            `https://c.tenor.com/uN6dnIXT96sAAAAC/dancinganime-anime.gif`,
            `https://c.tenor.com/lg6et3PExXQAAAAC/dancing-cute.gif`,
            `https://c.tenor.com/tNhtH9x3WZEAAAAC/swing-dance-swing-your-hips.gif`,
            `https://c.tenor.com/8WUdf7R3GRQAAAAd/dance-girl.gif`,
            `https://c.tenor.com/jWRFHjiNdkgAAAAd/anime-dance.gif`,
            `https://c.tenor.com/xnh1TiP1RhwAAAAC/anime-dance.gif`,
            `https://c.tenor.com/Z6Gqy-qS-EQAAAAC/kakashi-naruto.gif`,
            `https://c.tenor.com/P-8ZvqnS4AwAAAAC/dancing-cat-dancing-kitten.gif`,
            `https://c.tenor.com/VHQymsD6WzUAAAAC/daisuke-dance.gif`,
            `https://c.tenor.com/qXWBVDCCcWoAAAAM/anime-dance.gif`,
            `https://c.tenor.com/DbRUHnh1JfsAAAAd/chika-chika-dance.gif`,
            `https://c.tenor.com/yXLL673XWMAAAAAd/anya-anya-forger.gif`,
            `https://c.tenor.com/2vkg2P2nWVkAAAAC/lonely-anya-spy-x-family.gif`,
            `https://c.tenor.com/vmtzq0Cp5HwAAAAC/demon-slayer-demon-slayer-dance.gif`,
            `https://c.tenor.com/DyC25FyjsvYAAAAd/hunter-x-hunter-dance-wavy-occean.gif`,
            `https://c.tenor.com/L9I0IxUUfccAAAAC/eren-titan-armored-titan.gif`,
            `https://c.tenor.com/hHxlmVMlsM8AAAAC/danse-dancing.gif`,
            `https://c.tenor.com/oxaFfPhfONwAAAAC/dance-moves-aot.gif`,
            `https://c.tenor.com/_WhTk5vPKRcAAAAC/attack-on-titans-party-hard.gif`,
            `https://c.tenor.com/aMWbf9OxwKsAAAAC/dance-anime.gif`,
            `https://c.tenor.com/xxZhIGsr31MAAAAd/female-titan-dance-female.gif`,
            `https://c.tenor.com/TuQ94_wzVyEAAAAC/anime-party.gif`,
            `https://c.tenor.com/k1hDOibKcegAAAAd/colossal-titan-attack-on-titan.gif`,
            `https://c.tenor.com/UxW6bA7KnJYAAAAd/dance-aot.gif`,
            `https://c.tenor.com/BrvmtcrMQ3EAAAAd/kobayashi-dragon-maid-tohru.gif`,
            `https://c.tenor.com/zARJhzhueIEAAAAC/umaru-cheering.gif`

        ]

        if (!user) {

            const embed = new discord.MessageEmbed()
                .setColor(`#FFA500`)
                .setDescription(`**${interaction.user.username}** is vibing :man_dancing:`)
                .setImage(dance[Math.floor(Math.random() * dance.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed] })

        } else {

            const embed = new discord.MessageEmbed()
                .setColor(`#FFA500`)
                .setDescription(`**${interaction.user.username}** is dancing with **${user.user.username}** :man_dancing:`)
                .setImage(dance[Math.floor(Math.random() * dance.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed] })

        }

    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `dance`)
    }

}

module.exports.help = {
    name: `dance`
}
