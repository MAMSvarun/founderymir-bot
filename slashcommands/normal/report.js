const discord = require('discord.js')

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try {

        let user = interaction.options.getMember(`user`)

        let reason = interaction.options.getString(`reason`)

        let Avatar = user.user.displayAvatarURL();
        let Channel = interaction.guild.channels.cache.find((ch) => ch.name === "reports") 

        const embed = new discord.MessageEmbed()
            .setTitle('New Report!')
            .setDescription(`${interaction.user} has reported ${user}!`)
            .setColor("RED")
            .setThumbnail(Avatar)
            .addFields(
                { name: "Reported By:", value: `${interaction.user.tag}\n_${interaction.user.id}_`, inline: true },
                { name: "Reported On:", value: `${user.user.tag}\n_${user.user.id}_`, inline: true },
                { name: "Reason:", value: `\`${reason}\``, inline: true }
            )
            .setTimestamp()

        Channel.send({ embeds: [embed] })
        await interaction.reply({ content: '**Reported the User successfully. Admins will check your report and will take an Action in 24Hours.**', ephemeral: true })

    } catch (err) {
        console.log(err)
        slasherrorlog(err, interaction, 'report')
    }

}

module.exports.help = {
    name: "report"
}