const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return; // this makes sure that the cmd starts with the prefix

    let member = message.mentions.users.first() || message.author;

    try {
        let avatar = member.displayAvatarURL({ size: 4096, dynamic: true })

        const embed = new discord.MessageEmbed()
            .setTitle(`${member.tag}'s Avatar`)
            .setURL(avatar)
            .setImage(avatar)
            .setColor('RANDOM')
        message.channel.send({ embeds: [embed] })
        message.delete()
    } catch (err) {
        console.log(err)
        errorlog(err, message, 'avatar')
    }


}



module.exports.help = {
    name: `avatar`,
    aliases: ["pfp", `av`],
    cooldown: 15
};