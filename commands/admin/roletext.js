const discord = require(`discord.js`)

module.exports.run = async(Client, message, agrs, prefix) => {
    if(!message.content.startsWith(prefix)) return
    if(message.author.id != message.guild.ownerId) return

    const citizenrole = message.guild.roles.cache.find(r => r.name === 'Citizen')
    const cadetcorp = message.guild.roles.cache.find(r => r.name === 'Cadet Corp')
    const cadet = message.guild.roles.cache.find(r => r.name === 'Graduated Cadet')
    const garrison = message.guild.roles.cache.find(r => r.name === `Garrison`)
    const military = message.guild.roles.cache.find(r => r.name === `Military Police`)
    const survey = message.guild.roles.cache.find(r => r.name === `Survey Corps`)
    const hange = message.guild.roles.cache.find(r => r.name === `Hange Squad`)
    const levisquad = message.guild.roles.cache.find(r => r.name === `Levi Squad`)

    const embed = new discord.MessageEmbed()
    .setColor(`BLURPLE`)
    .setDescription(`**When you join the server ${citizenrole} will be added to you. Without that role, you can't assign other roles.**\n\n**_Level Roles:_**\n${cadetcorp} - Level 5\n${cadet} - Level 10\n${garrison} - Level 15\n${military} - Level 20\n${survey} - Level 30\n${hange} - Level 40\n${levisquad} - Level 50\n\n**These roles will be added to you as you Level UP**⬆️.\n\n**Once you reach ${levisquad} you can be a Moderator.**\n\n\n__You can self-assign the roles provided below__`)

    message.channel.send({embeds: [embed]})
    message.delete()

}

module.exports.help = {
    name: `roletext`,
    aliases: []
}