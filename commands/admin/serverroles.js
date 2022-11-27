const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return
    if(message.author.id != message.guild.ownerId) return

    const reactembed = new discord.MessageEmbed()
        .setColor(`BLURPLE`)
        .setTitle(`SERVER ROLES`)
        .setDescription(`**Choose your roles to get started with the Server.**\nTo remove a role you already have, just select the role and it will be removed.`)
        .addField('\u200b', '\u200b')
        .addFields(
            { name: `Otaku`, value: `Access the Members Chat and channels related to Anime-Manga, ChatBots, Bot Games and more` },
            { name: `Other Anime Otaku`, value: `Access channels related to Other Anime` },
            { name: `Simp Squad`, value: `Access channels for Simping and Shipping anime characters` },
            { name: 'Poll Ping', value: `Get notification whenever we upload a poll`}
        )

    const row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageSelectMenu()
                .setCustomId(`serverroles`)
                .setPlaceholder(`Select to Add or Remove roles`)
                .addOptions([
                    {
                        label: `Otaku`,
                        description: `This role is necessary to access Members Chat`,
                        value: `otaku`
                    },

                    {
                        label: `Other Anime Otaku`,
                        description: `Get Access to Other Anime chats.`,
                        value: `other`
                    },

                    {
                        label: `Simp Squad`,
                        description: `Get Access to Shipping and Simping Channels`,
                        value: `simp`
                    },


                    {
                        label: 'Poll Ping',
                        description: 'Get pings on our weekly polls.',
                        value: 'poll'
                    }
                ])
        )

    await message.channel.send({ embeds: [reactembed], components: [row] })

    

    message.delete()
}

module.exports.help = {
    name: `serverroles`,
    aliases: [`sroles`]
}