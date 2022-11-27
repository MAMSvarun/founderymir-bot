const discord = require('discord.js')
const { Canvas } = require('canvacord');

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return;

    let target = message.mentions.users.first()
    if (!target) target = message.author

    try{
        let avatar = message.author.displayAvatarURL({format: 'png'})
        let image = await Canvas.wanted(avatar)

        const attachment = new discord.MessageAttachment(image, 'wanted.png')
        message.delete()
        message.channel.send({files: [attachment]})
    }catch(err){
        console.log(err)
        errorlog(err, message, 'wanted')
    }


}

module.exports.help = {
    name: 'wanted',
    aliases: [],
    cooldown: 60
}