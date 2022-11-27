const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    if(message.author.id != message.guild.ownerId) return
    const rpreactembed = new discord.MessageEmbed()
        .setTitle(`ROLEPLAY ROLES`)
        .setColor(`BLURPLE`)
        .setDescription(`**Choose your roles for Roleplaying, you need to have atleast one Roleplay Role to access the roleplay channels.**\nTo remove a role you already have, just select the role and it will be removed.`)
        .addField('\u200b', '\u200b')
        .addFields(
            {name: `Reiss Family👑`, value: `Members of the Fritz and Reiss Family`},
            {name: `Commanders🧥`, value: `Commanders of Cadet Corps, Garrison, Survey Corps, Military Police`},
            {name: `Military Police🐎`, value: `Maintain Order, Serve as king's guard`},
            {name: `Levi Squad⚔️`, value: `Special Operations Squad led by Lieutenant Levi`},
            {name: `Hange Squad👓`, value: `The Fourth Squad led by Section Commander Hange Zoe`},
            {name: `Warriors💂`, value: `Marleyans and the soldiers sent by Marley to Paradis to retrieve Founding Titan`},
            {name: `Yeagarists💂`, value: `Rebels of Paradis led by Eren Yeagar`},
            {name: `Survey Corps🪶`, value: `Venture outside the walls and survey the titan-occupied land.`},
            {name: `Garrison Regiment👮`, value: `Protect the Walls and clear the titans near to the walls`},
            {name: `104th Cadet Corps⚔️`, value: `The training corps shown in Attack on Titan anime/manga`},
            {name: `Special Citizen👨‍⚕️`, value: `Persons shown in Attack on Titan anime/manga who are not there in any division`}
        )
    const row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageSelectMenu()
                .setCustomId(`rprole`)
                .setPlaceholder(`Select to Add or Remove roles`)
                .addOptions([
                    {
                        label: `[RP]Reiss Family`,
                        description: `Members of the Fritz and Reiss Family`,
                        value: `reiss`
                    },

                    {
                        label: `[RP]Commanders`,
                        description: `Commanders of Cadet Corps, Garrison, Survey Corps, Military Police`,
                        value: `commander`
                    },

                    {
                        label: `[RP]Military Police`,
                        description: `Maintain Order, Serve as king's guard`,
                        value: `military`
                    },

                    {
                        label: `[RP]Levi Squad`,
                        description: `Special Operations Squad led by Lieutenant Levi`,
                        value: `levisquad`
                    },

                    {
                        label: `[RP]Hange Squad`,
                        description: `The Fourth Squad led by Section Commander Hange Zoe`,
                        value: `hangesquad`
                    },

                    {
                        label: `[RP]Warriors`,
                        description: `Marleyans and the soldiers sent by Marley to Paradis to retrieve Founding Titan`,
                        value: `warriors`
                    },

                    {
                        label: `[RP]Yeagarists`,
                        description: `Rebels of Paradis led by Eren Yeagar`,
                        value: `yeagarists`
                    },

                    {
                        label: `[RP]Survey Corps`,
                        description: `Venture outside the walls and survey the titan-occupied land`,
                        value: `surveycorps`
                    },

                    {
                        label: `[RP]Garrison Regiment`,
                        description: `Protect the Walls and clear the titans near to the walls`,
                        value: `garrison`
                    },

                    {
                        label: `[RP]104th Cadet Corps`,
                        description: `The training corps shown in Attack on Titan anime/manga`,
                        value: `cadet`
                    },

                    {
                        label: `[RP]Special Citizen`,
                        description: `Persons shown in Attack on Titan anime/manga who are not there in any division`,
                        value: `special`
                    }
                ])
        )

    await message.channel.send({ embeds: [rpreactembed], components: [row] })


    message.delete()
}

module.exports.help = {
    name: `rproles`,
    aliases: []
}
