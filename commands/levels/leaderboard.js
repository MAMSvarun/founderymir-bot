const discord = require('discord.js')
const levels = require('discord-xp')

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return;

    try {
        const rawLeaderboard = await levels.fetchLeaderboard(message.guild.id, 15); // We grab top 10 users with most xp in the current server.

        if (rawLeaderboard.length < 1) return message.reply({content: `**No one is in the LeaderBoard yet.**`}).then(msg => {
            setTimeout(() => {
                msg.delete()
                message.delete()
            }, 5000);
        })

        const leaderboard = await levels.computeLeaderboard(Client, rawLeaderboard, true); // We process the leaderboard.

        const lb = leaderboard.map(e => `#${e.position}| **__${e.username}#${e.discriminator}__**\n**Level**: ${e.level}\n**XP**: ${e.xp.toLocaleString()}\n------------`); // We map the outputs.

        const embed = new discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('LEADERBOARD')
            .setDescription(lb.join("\n\n"))

        message.channel.send({ embeds: [embed] });
        message.delete()
    } catch (err) {
        console.log(err)
        errorlog(err, message, 'leaderboard')
    }

}

module.exports.help = {
    name: 'leaderboard',
    aliases: ['lb']
}