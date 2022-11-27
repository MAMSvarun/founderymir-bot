let discord = require(`discord.js`)
let wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {
    try {


        shocked = [
           
            `https://media.tenor.com/ineX8L6KwUQAAAAC/spy-x-family-anime.gif`,
            `https://media.tenor.com/gQ2ZXAm6hEsAAAAi/molly-jinzhan.gif`,
            `https://media.tenor.com/jeqWyvBJftMAAAAC/anime-shocked.gif`,
            `https://media.tenor.com/Qtxx5a7UiFAAAAAd/sushichaeng-anime-reaction.gif`,
            `https://media.tenor.com/8V9XeqNjpx4AAAAd/lol-anime-lol.gif`,
            `https://media.tenor.com/KEmwueB8ABAAAAAC/shocked-anime.gif`,
            `https://media.tenor.com/ihqN6a3iiYEAAAAC/pikachu-shocked-face-stunned.gif`,
            `https://media.tenor.com/TffcsLG7VAYAAAAd/slow-loop-anime-blush.gif`,
            `https://media.tenor.com/YYCz3Rsjr_wAAAAd/shock-surprise.gif`,
            `https://media.tenor.com/S8UHNpiXA8YAAAAC/heroine-tarumono-heroines-run-the-show.gif`,
            `https://media.tenor.com/9oZmHkACCFcAAAAC/anime-coffee.gif`,
            `https://media.tenor.com/pGopKd9Rr6UAAAAC/spy-x-family-anya.gif`,
            `https://media.tenor.com/nZk9wHCTBe0AAAAC/spy-x-family-anya.gif`,
            `https://media.tenor.com/H7bL581Wb7UAAAAC/umaruchan-himouto.gif`,
            `https://media.tenor.com/2Bd_AjQEw28AAAAC/rangiku-bleach.gif`,
            `https://media.tenor.com/YlvslsVRBLYAAAAC/kanna-chan.gif`,
            `https://media.tenor.com/R4D5dYv31g0AAAAC/kanna-chan.gif`,
            `https://media.tenor.com/uUzU1kjamLoAAAAC/gochiusa-istheorderarabbit.gif`,
            `https://media.tenor.com/QtIvSfMN6RMAAAAC/armin-arlert-shingeki-no-kyojin.gif`,
            `https://media.tenor.com/LgQsFIFyfgwAAAAC/attack-on-titan-mikasa.gif`,
            `https://media.tenor.com/mbBSGM0ffbsAAAAC/eren-shocked.gif`,
            `https://media.tenor.com/rbhsh61ICUAAAAAd/eren-yeager-betrayal.gif`

        ]



        let embed = new discord.MessageEmbed()
            .setColor(`BLURPLE`)
            .setDescription(`**${interaction.user.username}** is shocked <:scared_Armin:864811427919167510>`)
            .setImage(shocked[Math.floor(Math.random() * shocked.length)])

        await interaction.deferReply()
        await wait(1000)
        await interaction.editReply({ embeds: [embed] })


    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `shocked`)
    }

}

module.exports.help = {
    name: `shocked`
}
