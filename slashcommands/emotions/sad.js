let discord = require(`discord.js`)
let wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {
    try {

        let user = interaction.options.getMember(`user`)

        sad = [

            `https://media.tenor.com/RY9NX67klacAAAAi/sad-cute.gif`,
            `https://media.tenor.com/3tZndmyGVEgAAAAC/anime-depressed.gif`,
            `https://media.tenor.com/CdwDXdGptlsAAAAC/anime-sad-sad.gif`,
            `https://media.tenor.com/2cVmIkey2V8AAAAd/pokemon-pikachu.gif`,
            `https://media.tenor.com/jTei9b9RH0wAAAAC/anime-sad.gif`,
            `https://media.tenor.com/Tn9mzxqYNs4AAAAd/kukuru-misakino-anime.gif`,
            `https://media.tenor.com/etvJEflutuYAAAAd/shiroi-suna-no-aquatope-the-aquatope-on-white-sand.gif`,
            `https://media.tenor.com/C1Iny14iXjoAAAAd/life-sad.gif`,
            `https://media.tenor.com/17IgpB1KexsAAAAC/trash-disappointed.gif`,
            `https://media.tenor.com/eu8Q-92AKpwAAAAC/anime-aesthetic.gif`,
            `https://media.tenor.com/zdm3cwuu8XYAAAAC/kokomi-sad-anime-bubble-genshin.gif`,
            `https://media.tenor.com/NNiGVEQUaZwAAAAC/eren-eren-aot.gif`,
            `https://media.tenor.com/aw84YWMP__0AAAAC/attack-on-titan-eren.gif`,
            `https://media.tenor.com/JhCzqNf186kAAAAd/yaaa.gif`,
            `https://media.tenor.com/EM29L3H6fOsAAAAC/mikasa.gif`,
            `https://media.tenor.com/lUn8z2EuQ1QAAAAC/snk-mikasa-season4.gif`,
            `https://media.tenor.com/M6Xe3V_Od5QAAAAC/historia-reiss-mappa-historia.gif`,
            `https://media.tenor.com/vg34j8jOMSMAAAAM/levi-petra.gif`,
            `https://media.tenor.com/77sxhfsV3XoAAAAd/armin-sad.gif`,
            `https://media.tenor.com/sKJ06QT2xUwAAAAC/anya-anya-spy-x-family.gif`

        ]

        if (!user) {

            let embed = new discord.MessageEmbed()
                .setColor(`C48189`)
                .setDescription(`**${interaction.user.username}** is feeling sad <:pain:869796402602070097>`)
                .setImage(sad[Math.floor(Math.random() * sad.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed] })

        } else {

            let embed = new discord.MessageEmbed()
                .setColor(`BCB88A`)
                .setDescription(`**${interaction.user.username}** is feeeling sad because of ${user.user.username} <:pain:869796402602070097>`)
                .setImage(sad[Math.floor(Math.random() * sad.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed] })

        }




    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `sad`)
    }

}

module.exports.help = {
    name: `sad`
}
