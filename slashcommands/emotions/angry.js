let discord = require(`discord.js`)
let wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try {

        let user = interaction.options.getMember(`user`)



        angry = [

            `https://c.tenor.com/mANowFDOs0cAAAAd/attack-on-titan-angry.gif`,
            `https://c.tenor.com/7-6TulvxeuwAAAAC/aot-sunday-attack-on-titan.gif`,
            `https://c.tenor.com/OxRYvc1gBiwAAAAM/attack-on.gif`,
            `https://c.tenor.com/mPCKqnu8AUYAAAAC/eren-yaeger-shut-up.gif`,
            `https://c.tenor.com/GKKjMPYduOEAAAAC/floch-forster-aot.gif`,
            `https://c.tenor.com/uq1ET4vhdo0AAAAC/levi-attack-on-titan.gif`,
            `https://c.tenor.com/xNrzukjvoHMAAAAC/mikasa-mad.gif`,
            `https://c.tenor.com/y85C6tdkWI0AAAAC/eren-yeager-in-titan.gif`,
            `https://c.tenor.com/iufVumNmhpIAAAAC/attack-on-titan-yelena.gif`,
            `https://c.tenor.com/Lz2K6kD5Z9MAAAAC/nagatoro-angry.gif`,
            `https://c.tenor.com/Afe5GH-oIUAAAAAC/anime-chainsaw.gif`,
            `https://c.tenor.com/et8C-aeLKV0AAAAC/jeanne-vanitas-no-carte.gif`,
            `https://c.tenor.com/cYRAeQqpaUMAAAAC/anime-angry-slow-loop.gif`,
            `https://c.tenor.com/-TDs8-mD4J8AAAAC/anime-animegirl.gif`,
            `https://c.tenor.com/HVtt2hO8Lv0AAAAC/vanitas-vanitas-no-carte.gif`,
            `https://c.tenor.com/1Tmm4et0npoAAAAd/tanjiro-angry.gif`,
            `https://c.tenor.com/X3x3Y2mp2W8AAAAC/anime-angry.gif`,
            `https://c.tenor.com/IXw-GbnwqQYAAAAC/anya-forger-anya-spy-x-family-anime.gif`,
            `https://c.tenor.com/4-gzt_E9i4gAAAAC/kanna-chan.gif`,
            `https://c.tenor.com/dJpiway_niUAAAAC/onichan-baka-onichan.gif`,
            `https://c.tenor.com/SvQTNpCojFkAAAAC/umaru-himouto-umaru-chan.gif`,
            `https://c.tenor.com/Dx5A1xxqW74AAAAC/umaru-angry.gif`,
            `https://c.tenor.com/KXE2S4-PlnUAAAAi/anime-baka.gif`,
            `https://c.tenor.com/7TWmFAzzLBcAAAAC/aot-grisha-yeager.gif`
        ]

        if (!user) {

            let embed = new discord.MessageEmbed()
                .setColor(`#FF2400`)
                .setDescription(`**${interaction.user.username}** is angry, put marshmellows on'em <:gaah:868081771047161867>`)
                .setImage(angry[Math.floor(Math.random() * angry.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed] })

        } else {
            
            let embed = new discord.MessageEmbed()
                .setColor(`#FF2400`)
                .setDescription(`**${interaction.user.username}** is angry on **${user.user.username}**, put marshmellows on'em <:gaah:868081771047161867>`)
                .setImage(angry[Math.floor(Math.random() * angry.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed] })
        }




    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `angry`)
    }

}

module.exports.help = {
    name: `angry`
}
