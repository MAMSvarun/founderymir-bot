const discord = require('discord.js');
const Level = require(`discord-xp`)
const userSchema = require(`../../schema/userSchema.js`)

module.exports.run = async (Client, interaction, slasherrorlog) => {

  try {

    const user = interaction.options.getMember(`user`)
    const soft = interaction.options.getString(`soft`)
    const reason = interaction.options.getString(`reason`)



    if (interaction.user.id == user.id && user.id != interaction.guild.ownerId) return interaction.reply({ content: `**You can't use this command on yourself**`, ephemeral: true })

    if (interaction.user.id != interaction.guild.ownerId && user.id == interaction.guild.ownerId || interaction.member.roles.highest.comparePositionTo(user.roles.highest) < 0) return interaction.reply({ content: `**You can't take action on someone superior than you.**`, ephemeral: true })

    if (interaction.user.id != interaction.guild.ownerId && interaction.member.roles.highest.comparePositionTo(user.roles.highest) == 0) return interaction.reply({ content: `**You can't take action on someone who is in the same level you are in.**`, ephemeral: true })



    let data;
    data = await userSchema.findOne({
      userId: user.user.id,
      guildId: interaction.guild.id
    })

    if (!data) {
      data = await userSchema.create({
        guildId: interaction.guild.id,
        userId: user.user.id
      })
    }




    if (soft == `Yes`) {

      if(data.softbanned == true) return interaction.reply({content: `**This user is already softbanned here**`, ephemeral: true})

      user.roles.cache.filter((r) => r.name !== "@everyone").forEach((x) => user.roles.remove(x.id))

      Level.deleteUser(user.user.id, interaction.guild.id)

      data.softbanned = true
      data.save()

      await user.send({
        embeds:
          [
            new discord.MessageEmbed()
              .setColor('RED')
              .setTitle(`YOU GOT SOFTBANNED`)
              .addFields(
                { name: 'Reason:', value: `\`${reason}\`` },
                { name: 'Admin:', value: `**${interaction.user.tag}**(${interaction.user.id})` }
              )
              .setFooter(`This is AoT`)
              .setTimestamp()
          ]
      })

      const banembed = new discord.MessageEmbed()
        .setColor('GREEN')
        .setDescription(`**${user} is softbanned now**`)
      await interaction.reply({ embeds: [banembed], ephemeral: true })


      const modlogChannel = Client.channels.cache.find((c) => c.name === 'modlogs')
      const embed = new discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Action Took: User SoftBanned')
        .setThumbnail(user.displayAvatarURL())
        .addFields(
          { name: 'Reason', value: `${reason}` },
          { name: 'Member:', value: `**${user.user.tag}**(${user.user.id})` },
          { name: 'Action Took by:', value: `**${interaction.user.tag}**(${interaction.user.id})` }
        )
        .setTimestamp()
      return await modlogChannel.send({ embeds: [embed] })


    } else if (soft === `No`) {

      user.ban({
        reason: reason
      })

      Level.deleteUser(user.user.id, interaction.guild.id)

      await interaction.reply({
        embeds:
          [
            new discord.MessageEmbed()
              .setColor('GREEN')
              .setDescription(`**${user.user.tag} is Banned from the server!**`)
          ],

        ephemeral: true
      })

      user.send({
        embeds:
          [
            new discord.MessageEmbed()
              .setColor('RED')
              .setTitle(`YOU ARE BANNED!`)
              .addFields(
                { name: `Reason:`, value: `\`${reason}\`` },
                { name: `Admin:`, value: `**${interaction.user.tag}**(${interaction.user.id})` }
              )
              .setFooter(`This is AOT`)
          ]
      })

      const modlogChannel = Client.channels.cache.find((c) => c.name === 'modlogs')
      const embed = new discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Action Took: User Banned')
        .setThumbnail(user.displayAvatarURL())
        .addFields(
          { name: 'Reason:', value: `${reason}` },
          { name: 'Member:', value: `**${user.user.tag}**(${user.id})` },
          { name: 'Action Took by:', value: `**${interaction.user.tag}**(${interaction.user.id})` }
        )
        .setTimestamp()
      modlogChannel.send({ embeds: [embed] })

    }


  } catch (err) {
    console.log(err)
    slasherrorlog(err, interaction, 'ban')
  }


}

module.exports.help = {
  name: `ban`
};
