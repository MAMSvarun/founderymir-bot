const discord = require(`discord.js`)

module.exports.run = async(Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return
    let ruler = message.guild.roles.cache.get(`862605391678275626`)

    if(!message.member.permissions.has(discord.Permissions.FLAGS.ADMINISTRATOR)) return

    let partnership = new discord.MessageAttachment(`https://media.discordapp.net/attachments/956624749541359687/956630226362843156/partnership.png?width=546&height=364`, `partnership.png`)
    let pngembed = new discord.MessageEmbed()
    .setColor(`BLURPLE`)
    .setImage(`attachment://partnership.png`)
    message.channel.send({embeds: [pngembed], files: [partnership]})

    

}

module.exports.help = {
    name: `ppng`,
    aliases: []
}       