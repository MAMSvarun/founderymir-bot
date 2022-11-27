const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix) => {
    if (!message.content.startsWith(prefix)) return

    if(message.author.id != message.guild.ownerId) return


    const row = new discord.MessageActionRow()
        .addComponents(new discord.MessageButton()
            .setEmoji('📰')
            .setStyle('LINK')
            .setURL('https://forms.gle/RXSZ71mbnxZXR7Fa8')
            )

    let embed = new discord.MessageEmbed()
        .setTitle('Ban Appeal')
        .setDescription(`**Get Ban Appeal form by Clicking the button below.**\n_Don't send any personal information in the forms_`)
        .addField('\u200b', '\u200b')
        .addField(`Note:`, `You will be taken to a Google Forms page and we are not related to Google in any way.\nIf you are unable to click the button, then [Click Here](https://forms.gle/RXSZ71mbnxZXR7Fa8)`)
        .setColor('GREEN')

    message.channel.send({content: `**You can appeal for an Unban through our Ban Appeal Form.**\n\nIf you think you got Banned without a Valid Reason or you think that you deserve to be Unbanned, then you can appeal for the Unban.\n\n Once you submit your response, admins will check it and will take a Desicion in 24Hours.\n\n _Sending one response is enough, don't send multiple responses, they will be ignored._`, embeds: [embed], components: [row] })
    message.delete()


}

module.exports.help = {
    name: 'banappeal',
    aliases: []
}
