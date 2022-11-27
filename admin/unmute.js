const discord = require('discord.js');
const userSchema = require(`../../schema/userSchema.js`)

module.exports.run = async (Client, interaction, slasherrorlog) => {

  try {

    let user = interaction.options.getMember(`user`)
    let reason = interaction.options.getString(`reason`)
    if (!reason) reason = `Not Specified`


    if (interaction.user.id == user.id && user.id != interaction.guild.ownerId) return interaction.reply({ content: `**You can't use this command on yourself**`, ephemeral: true })


    if (interaction.user.id != interaction.guild.ownerId && user.id == interaction.guild.ownerId || interaction.member.roles.highest.comparePositionTo(user.roles.highest) < 0) return interaction.reply({ content: `**You can't take action on someone superior than you.**`, ephemeral: true })


    if (interaction.user.id != interaction.guild.ownerId && interaction.member.roles.highest.comparePositionTo(user.roles.highest) == 0) return interaction.reply({ content: `**You can't take action on someone who is in the same level you are in.**`, ephemeral: true })



    let mutedRole = interaction.guild.roles.cache.find((r) => r.name == 'Muted')

    if (!user.roles.cache.get(mutedRole.id)) return interaction.reply({ content: '**This member is not Muted!**', ephemeral: true })

    if (mutedRole) {

      user.roles.remove(mutedRole);

      let embed7 = new discord.MessageEmbed()
        .setColor('GREEN')
        .setDescription(`**${user.user.tag} is now unmuted.**`)
      await interaction.reply({ embeds: [embed7], ephemeral: true })

      let data;
      data = await userSchema.findOne({
        userId: user.id
      })

      if (!data) {
        data = await userSchema.create({
          guildId: interaction.guild.id,
          userId: user.id
        })
      }

      data.muted = false
      data.save()

    }

    const modlogChannel = Client.channels.cache.find((c) => c.name === 'modlogs')
    const embed = new discord.MessageEmbed()
      .setColor('RED')
      .setTitle('Action Took: User got unmuted')
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: 'Reason:', value: `${reason}` },
        { name: 'Member:', value: `**${user.user.tag}**(${user.user.id})` },
        { name: 'Action Took by:', value: `**${interaction.user.tag}**(${interaction.user.id})` }
      )
      .setTimestamp()
    modlogChannel.send({ embeds: [embed] })

  } catch (err) {
    console.log(err)
    slasherrorlog(err, interaction, 'unmute')
  }



}

module.exports.help = {
  name: `unmute`
};
