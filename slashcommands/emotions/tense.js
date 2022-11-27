let discord = require(`discord.js`)
let wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try {


        tense = [

            `https://c.tenor.com/u3dZmv8YGZoAAAAC/tea-anime.gif`,
            `https://c.tenor.com/RX-VhmzYKDEAAAAC/anime-tense.gif`,
            `https://c.tenor.com/-QbZzrVuZywAAAAC/aoi-tense.gif`,
            `https://c.tenor.com/hXQ_u8VldZIAAAAC/onipan-nervous.gif`,
            `https://c.tenor.com/81X433wUXvIAAAAC/anime-smile.gif`,
            `https://c.tenor.com/XHnZPux6EH0AAAAd/space-dandy-anime.gif`,
            `https://c.tenor.com/GbwJXQ5b3IkAAAAC/anime-nervous.gif`,
            `https://c.tenor.com/L2T-SkYFByEAAAAC/yuudachi-terrified.gif`,
            `https://c.tenor.com/sbzzoAi06uAAAAAC/anya-spy-x-family-anime-spy-x-family.gif`,
            `https://c.tenor.com/yTL8XZkMOz8AAAAC/attack-on.gif`,
            `https://c.tenor.com/D3DhuINNDl0AAAAC/levi-levi-ackerman.gif`,
            `https://c.tenor.com/DGp9Dq8LX6cAAAAC/gaby-scared.gif`,
            `https://c.tenor.com/zvf-RIRdkhIAAAAd/reiner-braun-eren-yeager.gif`,
            `https://c.tenor.com/pG9kLev3du4AAAAM/falco-anime.gif`,
            `https://c.tenor.com/tw7B8HowmQUAAAAd/eren-transform.gif`,
            `https://c.tenor.com/RbsPwvUiapMAAAAC/rebecca-bluegarden-rebecca-ehhhhh.gif`

        ]

        let embed = new discord.MessageEmbed()
            .setColor(`#AFDCEC`)
            .setDescription(`**${interaction.user.username}** is feeling tensed, put an ice pack on'em <:Nezuko_concern:881201764819415060>`)
            .setImage(tense[Math.floor(Math.random() * tense.length)])

        await interaction.deferReply()
        await wait(1000)
        await interaction.editReply({ embeds: [embed] })



    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `tense`)
    }

}

module.exports.help = {
    name: `tense`
}
