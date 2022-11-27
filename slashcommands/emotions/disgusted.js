let discord = require(`discord.js`);
const { ifError } = require("node:assert");
let wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try {

        let user = interaction.options.getMember(`user`)


        bruh = [

            `https://c.tenor.com/MD88Q4PXYEIAAAAC/muichiro-bruh.gif`,
            `https://c.tenor.com/VLUZEOpoKzYAAAAC/eren-yeager-eren.gif`,
            `https://c.tenor.com/cjieTJHyisMAAAAM/bruh-moment.gif`,
            `https://c.tenor.com/bry_rOAR834AAAAC/bruh.gif`,
            `https://c.tenor.com/M2XAANtkNeoAAAAC/asuka-evangelion.gif`,
            `https://c.tenor.com/ZxZlLTPh72kAAAAd/historia-historia-reiss.gif`,
            `https://c.tenor.com/ew7hDhIqUFkAAAAC/anime-tanjiro.gif`,
            `https://c.tenor.com/8yMqNs21uTQAAAAd/anime-waiting-for-text.gif`,
            `https://c.tenor.com/Q0Rn2uWuXfAAAAAC/anime-saiki.gif`,
            `https://c.tenor.com/Eb86rEEHGK0AAAAC/mikasa.gif`,
            `https://c.tenor.com/xUFV9QdLTAkAAAAC/vtuber-bruh.gif`,
            `https://c.tenor.com/RbzaKMa7AM0AAAAC/leviackerman-attack.gif`,
            `https://c.tenor.com/SEEMSDLdDugAAAAd/anya-forger.gif`,
            `https://c.tenor.com/jnMyEaCNQcsAAAAC/anya-forger-anya-spy-x-family-anime.gif`,
            `https://c.tenor.com/Kc2NDksFY94AAAAd/tengen-uzui-tengen.gif`,
            `https://c.tenor.com/uzY-HdCCQg0AAAAC/bruh-goro-akechi.gif`,
            `https://c.tenor.com/3ku_QVMm70cAAAAC/bad-joke-tomioka.gif`,
            `https://c.tenor.com/GMdOfjnH_mkAAAAC/kaguya-shinomiya-love-is-war.gif`,
            `https://c.tenor.com/cHthyTyvuskAAAAC/rem-re-zero.gif`,
            `https://c.tenor.com/iOa2ZmAZVWcAAAAC/one-piece-make-face.gif`,
            `https://c.tenor.com/tkqgxjfCapsAAAAC/dazai-osamu-dazai.gif`,
            `https://c.tenor.com/NaJTEZrtm2kAAAAC/levi-levi-cringe.gif`
        ]

        if (!user) {

            let embed = new discord.MessageEmbed()
                .setColor(`#3A3B3C`)
                .setDescription(`**${interaction.user.username}** is disgusted on someone... very sad <:Tanjiro_Disgusted:881199000823423017>`)
                .setImage(bruh[Math.floor(Math.random() * bruh.length)])

            await interaction.deferReply()
            await wait(1000)
            await interaction.editReply({ embeds: [embed] })

        } else {

            let embed = new discord.MessageEmbed()
            .setColor(`#3A3B3C`)
            .setDescription(`**${interaction.user.username}** is disgusted on **${user.user.username}**... very sad <:Tanjiro_Disgusted:881199000823423017>`)
            .setImage(bruh[Math.floor(Math.random() * bruh.length)])

        await interaction.deferReply()
        await wait(1000)
        await interaction.editReply({ embeds: [embed] })

        }


    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `disgusted`)
    }

}

module.exports.help = {
    name: `disgusted`
}
