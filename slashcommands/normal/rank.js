const discord = require('discord.js')
const levels = require('discord-xp')
const canvacord = require('canvacord')
const wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try {

        let target = interaction.options.getUser(`user`)
        if (!target) target = interaction.user

        if (target.bot == true) return interaction.reply({ content: `**Bots do not have any levels**`, ephemeral: true })

        const user = await levels.fetch(target.id, interaction.guild.id, true); // Selects the target from the database.

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
            .then(async data => {
                const attachment = new discord.MessageAttachment(data, "rank.png");
                await interaction.deferReply()
                await wait(1000)
                await interaction.editReply({ files: [attachment] })
            });

    } catch (err) {
        console.log(err)
        slasherrorlog(err, interaction, 'rank')
    }


}

module.exports.help = {
    name: `rank`
}