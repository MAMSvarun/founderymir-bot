const discord = require('discord.js');

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try {


        let user = interaction.options.getMember(`user`)

        if (interaction.user.id == user.id && user.id != interaction.guild.ownerId) return interaction.reply({ content: `**You can't use this command on yourself**`, ephemeral: true })

        if (interaction.user.id != interaction.guild.ownerId && user.id == interaction.guild.ownerId || interaction.member.roles.highest.comparePositionTo(user.roles.highest) < 0) return interaction.reply({ content: `**You can't take action on someone superior than you.**`, ephemeral: true })

        if (interaction.user.id != interaction.guild.ownerId && interaction.member.roles.highest.comparePositionTo(user.roles.highest) == 0) return interaction.reply({ content: `**You can't take action on someone who is in the same level you are in.**`, ephemeral: true })




        const role = interaction.options.getRole(`role`)


        if (role.name == `Muted`) return interaction.reply({ content: `**This is Mute role, add it through the Mute command**`, ephemeral: true })

        if (role.name == `Ruler👑`) return interaction.reply({ content: `This is the Owner role. It can't be added to others.`, ephemeral: true })

        if (role.name == `Citizen`) return interaction.reply({ content: `This is the Citizen role. It should added to users who got softbanned, use the unban command.`, ephemeral: true })



        if (user.roles.cache.get(role.id)) {

            return await interaction.reply({ content: `**${user} already has the role ${role}!**`, ephemeral: true })

        } else {

            user.roles.add(role)

            const successembed = new discord.MessageEmbed()

                .setColor('GREEN')
                .setDescription(`**Added role ${role} to ${user} successfully.**`)

            await interaction.reply({ embeds: [successembed], ephemeral: true })

        }

        const modlogChannel = Client.channels.cache.find((c) => c.name === 'modlogs')
        const embed = new discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Action Took: Role Assigned')
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'Member:', value: `**${user.user.tag}**(${user.user.id})`, inline: true },
                { name: 'Action Took by:', value: `**${interaction.user.tag}**(${interaction.user.id})`, inline: true },
                { name: `Role:`, value: `${role.name}`, inline: true}
            )
            .setTimestamp()
        modlogChannel.send({ embeds: [embed] })

    } catch (err) {
        
        console.log(err)
        slasherrorlog(err, interaction, 'addrole')
    }



}

module.exports.help = {
    name: 'addrole'
}
