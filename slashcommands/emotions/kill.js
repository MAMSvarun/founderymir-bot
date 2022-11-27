let discord = require(`discord.js`)
let wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {
    try {

        let user = interaction.options.getMember(`user`)


        kill = [
            `https://c.tenor.com/NbBCakbfZnkAAAAC/die-kill.gif`,
            `https://c.tenor.com/Ce8ZMfAcjdoAAAAC/anime.gif`,
            `https://c.tenor.com/Ds187JeCgckAAAAC/animehit-fugirl.gif`,
            `https://c.tenor.com/Ze50E1rW44UAAAAd/akudama-drive.gif`,
            `https://c.tenor.com/Pexs__PHM4kAAAAC/akame-ga-kill-banned.gif`,
            `https://c.tenor.com/-UbmVOLixPcAAAAC/killing-anime-girl.gif`,
            `https://c.tenor.com/zopcO8RpVpUAAAAC/kill-yourself-killing-me-smalls.gif`,
            `https://c.tenor.com/AGTqt-wXyiEAAAAC/nichijou-minigun.gif`,
            `https://c.tenor.com/xQ9HqX1H9tsAAAAd/anime-dies-i-hate-you.gif`,
            `https://c.tenor.com/t-0fYVPgg1YAAAAC/pink-hair-anime.gif`,
            `https://c.tenor.com/t0jIJNDgC1IAAAAC/tsunomaki-watame-tsunomaki.gif`,
            `https://c.tenor.com/9VA1rPbexwoAAAAC/hange-hange-zoe.gif`,
            `https://c.tenor.com/lQDPfEu3HaIAAAAC/titan-kill.gif`,
            `https://media.tenor.com/9VIXiXV2cAYAAAAd/death-note.gif`
        ]


        if (!user) {

            let embed = new discord.MessageEmbed()
                .setColor(`#000000`)
                .setDescription(`**${interaction.user.username}** killed someone <:die2:869796650120523796>`)
                .setImage(hugs[Math.floor(Math.random() * hugs.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed] })

        } else {

            let embed = new discord.MessageEmbed()
                .setColor(`#000000`)
                .setDescription(`**${interaction.user.username}** killed **${user.user.username}** <:die2:869796650120523796>`)
                .setImage(kill[Math.floor(Math.random() * kill.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed] })

        }


    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `kill`)
    }

}

module.exports.help = {
    name: `kill`
}
