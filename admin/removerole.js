const discord = require('discord.js')

module.exports.run = async (Client, interaction, slasherrorlog) => {

  try {

    let user = interaction.options.getMember(`user`)
    let role = interaction.options.getRole(`role`)

    if (interaction.user.id == user.id && user.id != interaction.guild.ownerId) return interaction.reply({ content: `**You can't use this command on yourself**`, ephemeral: true })

    if (interaction.user.id != interaction.guild.ownerId && user.id == interaction.guild.ownerId || interaction.member.roles.highest.comparePositionTo(user.roles.highest) < 0) return interaction.reply({ content: `**You can't take action on someone superior than you.**`, ephemeral: true })

    if (interaction.user.id != interaction.guild.ownerId && interaction.member.roles.highest.comparePositionTo(user.roles.highest) == 0) return interaction.reply({ content: `**You can't take action on someone who is in the same level you are in.**`, ephemeral: true })




    if (role.name == `Citizen`) return interaction.reply({ content: `**This is the Citizen role, remove it by Softbanning the user.**`, ephemeral: true })

    if (role.name == `Muted`) return interaction.reply({ content: `**This is Mute role, remove it through the Unmute command**`, ephemeral: true })

    if (role.name == `Ruler👑`) return interaction.reply({ content: `This is the Owner role. Owners can't be demoted`, ephemeral: true })



    if (user.roles.cache.get(role.id)) {

      user.roles.remove(role)

      const embed = new discord.MessageEmbed()
        .setDescription(`**${user} no longer has the role ${role}**`)
        .setColor('GREEN')
      await interaction.reply({ embeds: [embed], ephemeral: true })


      const modlogChannel = Client.channels.cache.find((c) => c.name === 'modlogs')
      const embed2 = new discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Action Took: Role Removed')
        .setThumbnail(user.displayAvatarURL())
        .addFields(
          { name: 'Member:', value: `**${user.user.tag}**(${user.id})` },
          { name: 'Action Took by:', value: `**${interaction.user.tag}**(${interaction.user.id})` }
        )
        .setTimestamp()
      modlogChannel.send({ embeds: [embed2] })

    } else (
      interaction.reply({ content: `**${user} does not have the role ${role}, once check their roles correctly.**`, ephemeral: true })
    )

  } catch (err) {
    console.log(err)
    slasherrorlog(err, interaction, 'removerole')
  }

}

module.exports.help = {
  name: 'removerole'
}
