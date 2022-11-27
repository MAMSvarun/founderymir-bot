const discord = require(`discord.js`)
const Level = require(`discord-xp`)
const wait = require(`node:timers/promises`).setTimeout;
const userSchema = require(`../../schema/userSchema.js`);

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try {

        const userId = interaction.options.getString(`user-id`)
        const soft = interaction.options.getString(`soft`)

        if (isNaN(userId) == true) return interaction.reply({ content: `**Please type a proper User ID.**`, ephemeral: true })
        if (userId < 17) return interaction.reply({ content: `**User ID should be equal to 17 or more than 17 characters.**`, ephemeral: true })

        if (soft == 'Yes') {

            const softBannedUser = interaction.guild.members.cache.get(userId)
            if (!softBannedUser) return interaction.reply({ content: `**No User is found in this server with the User ID provided.**`, ephemeral: true })

            let data;
            data = await userSchema.findOne({
                userId: softBannedUser.user.id,
                guildId: interaction.guild.id
            })

            if (!data) {
                data = await userSchema.create({
                    guildId: interaction.guild.id,
                    userId: softBannedUser.user.id
                })
            }

            if (data.softbanned == false) return interaction.reply({ content: `**This User is not Softbanned here.**`, ephemeral: true })

            const citizenrole = interaction.guild.roles.cache.find(r => r.name == `Citizen`)

            softBannedUser.roles.add(citizenrole)

            data.softbanned = false
            data.save()

            Level.createUser(softBannedUser.user.id, interaction.guild.id)

            const sb_embed = new discord.MessageEmbed()
                .setColor(`GREEN`)
                .setDescription(`**${softBannedUser} is no longer softbanned here**`)

            await interaction.reply({ embeds: [sb_embed], ephemeral: true })

            softBannedUser.send(
                {
                    embeds: [
                        new discord.MessageEmbed()
                            .setColor(`GREEN`)
                            .setTitle(`YOU ARE NO LONGER SOFTBANNED`)
                            .setDescription(`**The moderation team has removed the softban on you in** _This is AoT server_\n\nWe hope that in future you won't cause any activity in the server which leads to another softban(_multiple softbans leads to a permanent ban from the server_)`)
                    ]
                }
            )


            const modlogChannel = Client.channels.cache.find((c) => c.name === 'modlogs')
            const modembed = new discord.MessageEmbed()
                .setColor('RED')
                .setTitle('Action Took: User Unbanned')
                .setThumbnail(softBannedUser.user.displayAvatarURL())
                .addFields(
                    { name: 'Member:', value: `**${softBannedUser.user.tag}**(${softBannedUser.user.id})` },
                    { name: 'Action Took by:', value: `**${interaction.user.tag}**(${interaction.user.id})` }
                )
                .setTimestamp()
            return await modlogChannel.send({ embeds: [modembed] })


        } else if (soft == 'No') {

            await interaction.guild.bans.fetch().then(async bans => {

                if (bans.size === 0) {

                    return await interaction.editReply({ content: `**There are no Bans in this server.**`, ephemeral: true })
                }

                let BannedUser = bans.find(ban => ban.user.id == userId)

                if (!BannedUser) {

                    return interaction.reply({ content: `**No user found to be banned with the User ID provided.**`, ephemeral: true })

                }

                await interaction.guild.members.remove(userId)
                let embed7 = new discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`**UserID: \`${userId}\` is now unbanned.**`)
                await interaction.reply({ embeds: [embed7], ephemeral: true })
            })


            const modlogChannel = Client.channels.cache.find((c) => c.name === 'modlogs')
            const embed = new discord.MessageEmbed()
                .setColor('RED')
                .setTitle('Action Took: User Unbanned')
                .addFields(
                    { name: 'UserID:', value: `**${userId}**` },
                    { name: 'Action Took by:', value: `**${interaction.user.tag}**(${interaction.user.id})` }
                )
                .setTimestamp()
            return await modlogChannel.send({ embeds: [embed] })

        }

    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `unban`)
    }



}

module.exports.help = {
    name: `unban`
}