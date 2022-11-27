let discord = require(`discord.js`)
let wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {
    try {

        let user = interaction.options.getMember(`user`)

        smirk = [

           `https://media.tenor.com/_irU8oUff_IAAAAC/anya-anya-forger.gif`,
           `https://media.tenor.com/1R55B_a5LSYAAAAi/smirk-yes.gif`,
           `https://media.tenor.com/8fLSfzhyAGEAAAAd/anya-anya-forger.gif`,
           `https://media.tenor.com/Pb1TfZhr-OQAAAAC/spy-x-family-anya.gif`,
           `https://media.tenor.com/R5RMkDoB_0IAAAAd/anya-anya-forger.gif`,
           `https://media.tenor.com/wXAH1JaMjk0AAAAd/shingeki-no-kyojin-shingeki.gif`,
           `https://media.tenor.com/1UKtZSlQK68AAAAC/anime-santania.gif`,
           `https://media.tenor.com/E7qBgAqGTWsAAAAC/smug-anime.gif`,
           `https://media.tenor.com/dGfF-OgJMf4AAAAC/umaru-san-wink.gif`,
           `https://media.tenor.com/tCjTgmOJZYcAAAAC/zragon-infinity-yuji-itadori.gif`,
           `https://media.tenor.com/6xo08Tguix4AAAAC/death-note-light-yagami.gif`,
           `https://media.tenor.com/ygyS-YON1poAAAAC/naruto-anime.gif`,
           `https://media.tenor.com/EHIkianDEOEAAAAd/hayase-nagatoro-smug-nagatoro-smug.gif`,
           `https://media.tenor.com/JYixIpfKa4wAAAAC/jashinchan-dropkick-evil-smile.gif`,
           `https://media.tenor.com/Z9g2dvFlA9kAAAAC/vanitas-vanitas-no-carte.gif`,
           `https://media.tenor.com/zXXANAY0zNQAAAAC/hxh-killua.gif`,
           `https://media.tenor.com/EFc7Jykr58UAAAAC/hayase-nagatoro-smug-hayase-nagatoro-evil-smile.gif`,
           `https://media.tenor.com/3D__CbAhTl8AAAAM/girl-cute.gif`,
           `https://media.tenor.com/izIJXsX8zKMAAAAC/sensual-wink.gif`,
           `https://media.tenor.com/5aZ8jrEPWfQAAAAC/kobayashi.gif`,
           `https://media.tenor.com/uspEqngXbzgAAAAC/tohru-dragon.gif`

        ]

        if (!user) {

            let embed = new discord.MessageEmbed()
                .setColor(`C48189`)
                .setDescription(`**${interaction.user.username}** is smirking heh <:satania:878144484435718215>`)
                .setImage(smirk[Math.floor(Math.random() * smirk.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed] })

        } else {

            let embed = new discord.MessageEmbed()
                .setColor(`#FFEF00`)
                .setDescription(`**${interaction.user.username}** is smirking at ${user.user.username} heh <:satania:878144484435718215>`)
                .setImage(smirk[Math.floor(Math.random() * smirk.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed] })

        }




    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `smirk`)
    }

}

module.exports.help = {
    name: `smirk`
}
