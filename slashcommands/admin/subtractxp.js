const discord = require(`discord.js`)
const Level = require(`discord-xp`)

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try {

        const user = interaction.options.getMember(`user`)
        const amount = interaction.options.getNumber(`amount`)

        if(user.bot == true) return interaction.reply({content: `**You cannot decrease the XP of bots since they don't have any.**`, ephemeral: true})

        const userxp = await Level.fetch(user.user.id, interaction.guild.id, true);

        if (interaction.user.id == user.id && user.id != interaction.guild.ownerId) return interaction.reply({ content: `**You can't use this command on yourself**`, ephemeral: true })

        if (interaction.user.id != interaction.guild.ownerId && user.id == interaction.guild.ownerId || interaction.member.roles.highest.comparePositionTo(user.roles.highest) < 0) return interaction.reply({ content: `**You can't take action on someone superior than you.**`, ephemeral: true })

        if (interaction.user.id != interaction.guild.ownerId && interaction.member.roles.highest.comparePositionTo(user.roles.highest) == 0) return interaction.reply({ content: `**You can't take action on someone who is in the same level you are in.**`, ephemeral: true })


        if (amount <= 0) {
            return interaction.reply({ content: `**Please specify an amount greater than 0**`, ephemeral: true })
        }

        if(userxp.xp - amount < 0) {
            return interaction.reply({content: `**You are trying to decrease their XP less than 0 which isn't possible**`, ephemeral: true})
        }

        Level.subtractXp(user.user.id, interaction.guild.id, amount)

        const embed = new discord.MessageEmbed()
            .setColor(`GREEN`)
            .setDescription(`Removed \`${amount}\` xp from ${user}`)

        interaction.reply({ embeds: [embed], ephemeral: true })

        const modlogChannel = Client.channels.cache.find((c) => c.name === 'modlogs')
        const modembed = new discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Action Took: XP Decreased')
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'Member:', value: `**${user.user.tag}**(${user.user.id})` },
                { name: `Decreased by:`, value: `${amount}`, inline: true},
                { name: 'Action Took by:', value: `**${interaction.user.tag}**(${interaction.user.id})` }
            )
            .setTimestamp()
        modlogChannel.send({ embeds: [modembed] })

    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `removexp`)
    }

}

module.exports.help = {
    name: `removexp`
}
