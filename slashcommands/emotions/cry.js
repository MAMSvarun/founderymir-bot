let discord = require(`discord.js`)
let wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {
    try {

        let user = interaction.options.getMember(`user`)

        cry = [

            `https://media.tenor.com/0qj0aqZ0nucAAAAC/anya-spy-x-family-anime-anya-crying.gif`,
            `https://media.tenor.com/Q9MAbF6w__QAAAAC/spy-x-family-anya-cry.gif`,
            `https://media.tenor.com/yb2NV8G8gbgAAAAC/spy-x-family-anya.gif`,
            `https://media.tenor.com/3Z8USZHMr-AAAAAd/kanna-cry-kanna.gif`,
            `https://media.tenor.com/TbGKaGTBI2QAAAAC/kobayashi-kobayashi-san-chi-no-maid-dragon.gif`,
            `https://media.tenor.com/10ixWTBLI7sAAAAC/llorandi.gif`,
            `https://media.tenor.com/q9V98YHPZX4AAAAC/anime-umaru.gif`,
            `https://media.tenor.com/yn-FwjzdvzMAAAAC/my-dress-up-darling-marin-kitagawa.gif`,
            `https://media.tenor.com/eh1Zchfmz4sAAAAC/anime-tears.gif`,
            `https://media.tenor.com/XBWh-szFwDQAAAAC/crying-naruto-crying.gif`,
            `https://media.tenor.com/OhuSWqAsQH4AAAAC/anime-girl-sad-sad.gif`,
            `https://media.tenor.com/EXikU561DxsAAAAC/sad-anime.gif`,
            `https://media.tenor.com/Fa3jCXxTWnoAAAAC/sad.gif`,
            `https://media.tenor.com/jC2xbbGdkKkAAAAC/anime-cry.gif`,
            `https://media.tenor.com/q0nNfTktQ7wAAAAC/crying-anime.gif`,
            `https://media.tenor.com/qrEyPG0mDVYAAAAC/aharen-san-anime-cry.gif`,
            `https://media.tenor.com/j-mVhVzhSAYAAAAC/anime-cry.gif`,
            `https://media.tenor.com/rfhztq1on6gAAAAC/anime-lucky-star.gif`,
            `https://media.tenor.com/xb3lLfpZTCkAAAAC/akame-crying-akame-cry.gif`,
            `https://media.tenor.com/ZK3DOFspBAUAAAAC/akko-qq.gif`,
            `https://media.tenor.com/LpeQrM-aPJYAAAAd/sasuke-uchiha-naruto-shippuden.gif`,
            `https://media.tenor.com/sCZ6fh4G1CIAAAAi/cry-crying.gif`,
            `https://media.tenor.com/Jo4ziExEwqAAAAAC/eren-yeager.gif`,
            `https://media.tenor.com/jf89x302vo0AAAAC/attack-on-titan-shingeki-no-kyojin.gif`,
            `https://media.tenor.com/k5XSQJZ-BX4AAAAd/attack-on-titan-ymir-fritz.gif`,
            `https://media.tenor.com/0ppudnEtyP4AAAAC/armin-armin-crying.gif`,
            `https://media.tenor.com/LgQsFIFyfgwAAAAC/attack-on-titan-mikasa.gif`,
            `https://media.tenor.com/cyKFB-sZna8AAAAC/mikasa-ackerman.gif`,
            `https://media.tenor.com/ZITNAEZVqfgAAAAC/armin-arlert-high-junior.gif`

        ]

        if (!user) {

            let embed = new discord.MessageEmbed()
                .setColor(`C48189`)
                .setDescription(`**${interaction.user.username}** is crying <:pain:869796402602070097>`)
                .setImage(cry[Math.floor(Math.random() * cry.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed] })

        } else {

            let embed = new discord.MessageEmbed()
                .setColor(`C48189`)
                .setDescription(`**${interaction.user.username}** is crying because of ${user.user.username} <:pain:869796402602070097>`)
                .setImage(cry[Math.floor(Math.random() * cry.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed] })

        }




    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `cry`)
    }

}

module.exports.help = {
    name: `cry`
}
