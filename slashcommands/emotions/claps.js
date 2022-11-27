let discord = require(`discord.js`)
let wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try {

        let user = interaction.options.getMember(`user`)



        claps = [

         `https://media.tenor.com/jncqY9-RbqcAAAAC/mushoku-tensei-roxy.gif`,
         `https://media.tenor.com/xdj7XE8llU8AAAAC/nekopara-clap.gif`,
         `https://media.tenor.com/4LlTKTRd0Q0AAAAC/sushichaeng-anime.gif`,
         `https://media.tenor.com/VWWYG8OJN1oAAAAC/mushoku-tensei-eris.gif`,
         `https://media.tenor.com/Kc6xuEK5sqgAAAAM/koi-clap-koi-yoshinaga-clap.gif`,
         `https://media.tenor.com/tyb15RWixEYAAAAM/puck-anime.gif`,
         `https://media.tenor.com/U3z5aOfQcm8AAAAM/akari-mizunashi-clap.gif`,
         `https://media.tenor.com/Yjwul_x8yd4AAAAM/nagito-komaeda-danganronpa.gif`,
         `https://media.tenor.com/9KYyvVXuROkAAAAM/nagatoro-clap.gif`,
         `https://media.tenor.com/gcqIuGc-xWwAAAAM/bravo-applause.gif`,
         `https://media.tenor.com/Dtjxa7rizZYAAAAM/jahy-sama-anime.gif`,
         `https://media.tenor.com/YgkED1S-Or0AAAAM/clapping-clapping-hands.gif`,
         `https://media.tenor.com/H9mTn_yc2vUAAAAM/slow-loop-koi-yoshinaga.gif`,
         `https://media.tenor.com/izydbX5MLjsAAAAM/spaghetti-toilet-bound-hanako-kun.gif`,
         `https://media.tenor.com/vSLHYhOpOmAAAAAM/clapping-hands-anime.gif`,
         `https://media.tenor.com/zVvMxtmpRaMAAAAM/taiga-asaka-clapping.gif`,
         `https://media.tenor.com/Qxx4rucquegAAAAM/anime-animeclap.gif`,
         `https://media.tenor.com/L-w_lJ6HQp0AAAAM/laughing-anime.gif`,
         `https://media.tenor.com/SfRORzFLPS8AAAAM/soule-eater-clapping.gif`,
         `https://media.tenor.com/2zFBIhiYcncAAAAM/rikka-rikka-chan.gif`

        ]

        if (!user) {

            let embed = new discord.MessageEmbed()
                .setColor(`#FF2400`)
                .setDescription(`**${interaction.user.username}** is clapping :clap:`)
                .setImage(claps[Math.floor(Math.random() * claps.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed] })

        } else {
            
            let embed = new discord.MessageEmbed()
                .setColor(`#FF2400`)
                .setDescription(`**${interaction.user.username}** is clapping for **${user.user.username}** :clap:`)
                .setImage(claps[Math.floor(Math.random() * claps.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed] })
        }




    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `claps`)
    }

}

module.exports.help = {
    name: `claps`
}