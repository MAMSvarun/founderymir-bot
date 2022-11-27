let discord = require(`discord.js`)
let wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {
    try {

        let user = interaction.options.getMember(`user`)

        punch = [

           `https://media.tenor.com/p_mMicg1pgUAAAAC/anya-forger-damian-spy-x-family.gif`,
           `https://media.tenor.com/6a42QlkVsCEAAAAd/anime-punch.gif`,
           `https://media.tenor.com/EfhPfbG0hnMAAAAC/slap-handa-seishuu.gif`,
           `https://media.tenor.com/SwMgGqBirvcAAAAC/saki-saki-kanojo-mo-kanojo.gif`,
           `https://media.tenor.com/rjR2Z67erfkAAAAd/death-saitama.gif`,
           `https://media.tenor.com/LR7jMiTMwmAAAAAC/jealous-punching.gif`,
           `https://media.tenor.com/nWTDZU5WQ4oAAAAC/anime-punching.gif`,
           `https://media.tenor.com/TjdM18POlUsAAAAC/eren-eren-jaeger.gif`,
           `https://media.tenor.com/9PGic3hJ-_sAAAAd/punch-levi.gif`,
           `https://media.tenor.com/tItp51ABXK4AAAAC/punch-eren.gif`,
           `https://media.tenor.com/JMviJqpLgfUAAAAC/eren-yeager-season4-aot.gif`,
           `https://media.tenor.com/fVOqQ8yXLpEAAAAd/eren-reiner.gif`,
           `https://media.tenor.com/WiNTNDGTfKUAAAAd/aot-eren.gif`,
           `https://media.tenor.com/aP7Du3RWX6YAAAAC/slap-anime.gif`,
           `https://media.tenor.com/6X0uII1Qml8AAAAd/aot-snk.gif`,
           `https://media.tenor.com/SkfoHZagMswAAAAd/dave-pp.gif`,
           `https://media.tenor.com/qDDsivB4UEkAAAAC/anime-fight.gif`,
           `https://media.tenor.com/H6lXjn-sET0AAAAC/saitama-genos.gif`,
           `https://media.tenor.com/mr2ppAEU-ocAAAAC/dragon-maid-maidragon.gif`,
           `https://media.tenor.com/FSyAy6fEABEAAAAd/jace-mega.gif`,
           `https://media.tenor.com/CLj5PsMhCLkAAAAC/naruto-sasuke.gif`

        ]

        if (!user) {

            let embed = new discord.MessageEmbed()
                .setColor(`C48189`)
                .setDescription(`**${interaction.user.username}** punched someone :punch:`)
                .setImage(punch[Math.floor(Math.random() * punch.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed] })

        } else {

            let embed = new discord.MessageEmbed()
                .setColor(`#FFEF00`)
                .setDescription(`**${interaction.user.username}** punched ${user.user.username} :punch:`)
                .setImage(punch[Math.floor(Math.random() * punch.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed] })

        }




    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `punch`)
    }

}

module.exports.help = {
    name: `punch`
}