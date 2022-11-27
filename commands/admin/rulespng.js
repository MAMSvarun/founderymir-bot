const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if(!message.content.startsWith(prefix)) return
    if(message.author.id != message.guild.ownerId) return
    let rulespng = new discord.MessageAttachment(`https://i.imgur.com/ML5wFJN.jpg`, `rules.png`)
    let pngembed = new discord.MessageEmbed()
    .setColor(`BLURPLE`)
    .setImage(`attachment://rules.png`)
    message.channel.send({embeds: [pngembed], files: [rulespng]})

}

module.exports.help = {
    name: 'rulespng',
    aliases: []
}