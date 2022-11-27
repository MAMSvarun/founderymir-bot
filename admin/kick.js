const discord = require('discord.js');

module.exports.run = async (Client, interaction, slasherrorlog) => {

  try {

    const user = interaction.options.getMember(`user`)
    const reason = interaction.options.getString(`reason`)



    if (interaction.user.id == user.id && user.id != interaction.guild.ownerId) return interaction.reply({ content: `**You can't use this command on yourself**`, ephemeral: true })

    if (interaction.user.id != interaction.guild.ownerId && user.id == interaction.guild.ownerId || interaction.user.roles.highest.comparePositionTo(user.roles.highest) < 0) return interaction.reply({ content: `**You can't take action on someone superior than you.**`, ephemeral: true })

    if (interaction.user.id != interaction.guild.ownerId && interaction.user.roles.highest.comparePositionTo(user.roles.highest) == 0) return interaction.reply({ content: `**You can't take action on someone who is in the same level you are in.**`, ephemeral: true })



    user.kick({

      reason: reason

    })

    let embed7 = new discord.MessageEmbed()

      .setColor('GREEN')
      .setDescription(`**${user.user.tag} got kicked from the server**`)

    await interaction.reply({ embeds: [embed7], ephemeral: true })

    user.send({
      embeds:
        [
          new discord.MessageEmbed()
          .setColor(`RED`)
          .setTitle(`YOU GOT KICKED!`)
          .setDescription(`You got kicked from the server **This is AoT** by the moderation team\n`)
          .addField({name: `Reason:`, value: `\`${reason}\``})
        ]
    })

    const modlogChannel = Client.channels.cache.find((c) => c.name === 'modlogs')
    const embed = new discord.MessageEmbed()
      .setColor('RED')
      .setTitle('Action Took: User got Kicked')
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: 'Reason:', value: `${reason}` },
        { name: 'Member:', value: `**${user.user.tag}**(${user.id})` },
        { name: 'Action Took by:', value: `**${interaction.user.tag}**(${interaction.user.id})` }
      )
      .setTimestamp()
    modlogChannel.send({ embeds: [embed] })



  } catch (err) {
    console.log(err)
    slasherrorlog(err, interaction, 'kick')
  }

}

module.exports.help = {
  name: `kick`
};
