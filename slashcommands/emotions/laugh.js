let discord = require(`discord.js`)
let wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {
    try {


        laugh = [
           
            `https://c.tenor.com/KYVGTRWokQoAAAAC/death-note-light-yagami.gif`,
            `https://c.tenor.com/An-9HfjvNkwAAAAC/kuroo-tetsurou-haikyuu.gif`,
            `https://c.tenor.com/8nSbJK3j7EUAAAAC/laugh-anime.gif`,
            `https://c.tenor.com/B-expmjx5R0AAAAC/natsu-lol.gif`,
            `https://c.tenor.com/4D2UEir0fS4AAAAd/madarame-genshiken.gif`,
            `https://c.tenor.com/hkauYx2YVLQAAAAC/vanitas-no-carte-the-case-study-of-vanitas.gif`,
            `https://c.tenor.com/BP9vMzwRSZwAAAAC/laughing-lol.gif`,
            `https://c.tenor.com/gzM_6h_nC_sAAAAC/nichijou-hahaha.gif`,
            `https://c.tenor.com/0VdcdocyQoQAAAAC/mha-evil-laugh.gif`,
            `https://c.tenor.com/fbWCY-1exTsAAAAC/bokura-wa-minna-kawaisou-gifs-to-reaction.gif`,
            `https://c.tenor.com/FTxPIN6M2LUAAAAC/mitsuri-tqt.gif`,
            `https://c.tenor.com/QdB7f-2y4ewAAAAC/takumi-laugh.gif`,
            `https://c.tenor.com/XsnntKfxlJsAAAAM/annie-attack-on-titan.gif`,
            `https://c.tenor.com/6GTkBXMxQFIAAAAM/aot-attack-on-titan.gif`,
            `https://c.tenor.com/pPv3JFhB7VgAAAAC/connie-springer-shingeki-no-kyojin.gif`,
            `https://c.tenor.com/4zhnPGDl5MgAAAAC/sasha-laughing.gif`,
            `https://c.tenor.com/jqywaNJHfNwAAAAC/naruto-shippuden-uzumaki-naruto.gif`,
            `https://c.tenor.com/wQQugRAwI6kAAAAC/laugh-laughing.gif`,
            `https://c.tenor.com/ppqVQB1PoBAAAAAC/tom-y-jerry-tom-and-jerry.gif`,
            `https://c.tenor.com/JdVmalDdPn8AAAAC/one-piece-luffy.gif`,
            `https://c.tenor.com/sE7TyGS6JTcAAAAC/laugh-bleach.gif`

        ]



        let embed = new discord.MessageEmbed()
            .setColor(`BLURPLE`)
            .setDescription(`**${interaction.user.username}** is LOLing <:laughing_historia:878183139409805372>`)
            .setImage(laugh[Math.floor(Math.random() * laugh.length)])

        await interaction.deferReply()
        await wait(1000)
        await interaction.editReply({ embeds: [embed] })


    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `laugh`)
    }

}

module.exports.help = {
    name: `laugh`
}
