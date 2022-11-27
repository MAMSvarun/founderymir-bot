const discord = require('discord.js')
const { Canvas } = require('canvacord')

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return;

    let target = message.mentions.users.first()
    if (!target) target = message.author

    try{

        let avatar = target.displayAvatarURL({format: 'png'})
        let image = await Canvas.invert(avatar)

        const attachment = new discord.MessageAttachment(image, 'negative.png')
        message.delete()
        message.channel.send({files: [attachment]})

    }catch(err){
        console.log(err)
        errorlog(err, message, 'negative')
    }

}

module.exports.help = {
    name: 'negative',
    aliases: [],
    cooldown: 60
}