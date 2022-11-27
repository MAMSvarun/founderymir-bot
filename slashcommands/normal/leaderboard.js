const discord = require('discord.js')
const levels = require('discord-xp')
const wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try {
        const rawLeaderboard = await levels.fetchLeaderboard(interaction.guild.id, 15); // We grab top 10 users with most xp in the current server.

        if (rawLeaderboard.length < 1) return interaction.reply({content: `**No one is in the LeaderBoard yet.**`, ephemeral: true})

        const leaderboard = await levels.computeLeaderboard(Client, rawLeaderboard, true); // We process the leaderboard.

        const lb = leaderboard.map(e => `#${e.position}| **__${e.username}#${e.discriminator}__**\n**Level**: ${e.level}\n**XP**: ${e.xp.toLocaleString()}\n------------`); // We map the outputs.

        const embed = new discord.MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('LEADERBOARD')
            .setDescription(lb.join("\n\n"))

        await interaction.deferReply()
        await wait(1000)
        await interaction.editReply({ embeds: [embed] });
        
    } catch (err) {
        console.log(err)
        slasherrorlog(err, interaction, 'leaderboard')
    }

}

module.exports.help = {
    name: 'leaderboard'
}