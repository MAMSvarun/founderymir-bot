const discord = require('discord.js')
const levels = require('discord-xp')
const canvacord = require('canvacord')

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return

    let target = message.mentions.users.first() || message.author

    try {
        if(target.bot) return message.reply({content: `**Levels won't get assigned to bots**`}).then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 5000);
        })

        const user = await levels.fetch(target.id, message.guild.id, true); // Selects the target from the database.

        message.channel.send({ content: 'Building Rank Card...' }).then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 5000);
        })

        const rank = new canvacord.Rank() // Build the Rank Card
            .setAvatar(target.displayAvatarURL({ format: 'png', dynamic: true }))
            .setCurrentXP(user.xp) // Current User Xp
            .setRequiredXP(levels.xpFor(user.level + 1)) // We calculate the required Xp for the next level
            .setRank(user.position, 'RANK') // Position of the user on the leaderboard
            .setLevel(user.level, 'LEVEL') // Current Level of the user
            .setProgressBar("#a81d16", "COLOR")
            .setUsername(target.username)
            .setDiscriminator(target.discriminator)
            .setBackground("IMAGE", "https://i.imgur.com/kOWbyr1.png")
            .setLevelColor('#00dfee', '#00dfee')

        rank.build()
            .then(data => {
                const attachment = new discord.MessageAttachment(data, "rank.png");
                message.channel.send({ files: [attachment] });
                message.delete()
            });
    } catch (err) {
        console.log(err)
        errorlog(err, message, 'rank')
    }


}

module.exports.help = {
    name: 'level',
    aliases: [`rank`]
}
