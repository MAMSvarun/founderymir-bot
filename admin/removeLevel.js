const discord = require('discord.js')
const Level = require('discord-xp')

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try {


        let s_member = interaction.options.getMember(`user`)
        let levelamount = interaction.options.getNumber(`amount`)

        if(s_member.bot == true) return interaction.reply({content: `**You cannot decrease the level of bots since they don't have any.**`, ephemeral: true})

        const s_member_pl = await Level.fetch(s_member.id, interaction.guild.id, true); // Selects the target from the database.
        const previous_level = s_member_pl.level


        if (interaction.user.id == s_member.id && s_member.id != interaction.guild.ownerId) return interaction.reply({ content: `**You can't use this command on yourself**`, ephemeral: true })

        if (interaction.user.id != interaction.guild.ownerId && s_member.id == interaction.guild.ownerId || interaction.member.roles.highest.comparePositionTo(s_member.roles.highest) < 0) return interaction.reply({ content: `**You can't take action on someone superior than you.**`, ephemeral: true })

        if (interaction.user.id != interaction.guild.ownerId && interaction.member.roles.highest.comparePositionTo(s_member.roles.highest) == 0) return interaction.reply({ content: `**You can't take action on someone who is in the same level you are in.**`, ephemeral: true })

        if (levelamount == 0) {
            return interaction.reply({ content: `**The amount should not be Zero or less than Zero**`, ephemeral: true })
        }

        if (levelamount < 0) {
            return interaction.reply({ content: `**The amount should not be Zero or less than Zero**`, ephemeral: true })
        }

        if (levelamount > 100) {
            return interaction.reply({ content: `**You cannot decrease the level by 100**`, ephemeral: true })
        }

        if( previous_level - levelamount < 0) {
            return interaction.reply({content: `**You are trying to make their level less than Zero which is not possible**`, ephemeral: true})
        }


        Level.subtractLevel(s_member.user.id, interaction.guild.id, levelamount)


        const successembed = new discord.MessageEmbed()
            .setColor(`GREEN`)
            .setDescription(`Decreased ${s_member}'s level by \`${levelamount}\``)
        await interaction.reply({ embeds: [successembed], ephemeral: true })

        const modlogChannel = Client.channels.cache.find((c) => c.name === 'modlogs')
        const embed = new discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Action Took: Level Decreased')
            .setThumbnail(s_member.displayAvatarURL())
            .addFields(
                { name: 'Member:', value: `**${s_member.user.tag}**(${s_member.user.id})` },
                { name: `Previous Level:`, value: `${previous_level}`, inline: true},
                { name: `Decreased by:`, value: `${levelamount}`, inline: true},
                { name: 'Action Took by:', value: `**${interaction.user.tag}**(${interaction.user.id})` }
            )
            .setTimestamp()
        modlogChannel.send({ embeds: [embed] })

    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `removelevel`)
    }

}

module.exports.help = {
    name: `removelevel`
}
