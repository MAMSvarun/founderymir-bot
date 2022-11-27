const discord = require('discord.js')

module.exports.run = async (Client, interaction, slasherrorlog) => {

  try {

    let user = interaction.options.getmember(`user`)
    let nickname = interaction.options.getString(`nickname`)

    if (interaction.user.id == user.id && user.id != interaction.guild.ownerId) return interaction.reply({ content: `**You can't use this command on yourself**`, ephemeral: true })

    if (interaction.user.id != interaction.guild.ownerId && user.id == interaction.guild.ownerId || interaction.user.roles.highest.comparePositionTo(user.roles.highest) < 0) return interaction.reply({ content: `**You can't take action on someone superior than you.**`, ephemeral: true })

    if (interaction.user.id != interaction.guild.ownerId && interaction.user.roles.highest.comparePositionTo(user.roles.highest) == 0) return interaction.reply({ content: `**You can't take action on someone who is in the same level you are in.**`, ephemeral: true })


    await user.setNickname(nickname);

    const embed = new discord.MessageEmbed()
      .setDescription(`**Changed ${user}'s nickname to ${nickname}**`)
      .setColor('GREEN')
    await interaction.reply({ embeds: [embed], ephemeral: true })

    const modlogChannel = Client.channels.cache.find((c) => c.name === 'modlogs')
      const embed2 = new discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Action Took: Nickname Changed')
        .setThumbnail(user.displayAvatarURL())
        .addFields(
          { name: 'Member:', value: `**${user.user.tag}**(${user.id})` },
          { name: 'Action Took by:', value: `**${interaction.user.tag}**(${interaction.user.id})` }
        )
        .setTimestamp()
      modlogChannel.send({ embeds: [embed2] })

  } catch (err) {
    console.log(err)
    slasherrorlog(err, interaction, 'nickname')
  }

}

module.exports.help = {
  name: `nickname`
}
