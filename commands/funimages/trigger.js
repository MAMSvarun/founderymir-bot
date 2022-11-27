const discord = require('discord.js')
const { Canvas } = require('canvacord')

module.exports.run = async(Client, message, args, prefix, errorlog) => {
    if(!message.content.startsWith(prefix)) return;

    try{

        let avatar = message.author.displayAvatarURL({format: 'png'})
        let image = await Canvas.trigger(avatar)

        const attachment = new discord.MessageAttachment(image, 'triggered.png')
        message.delete()
        message.channel.send({files: [attachment]})

    }catch(err){
        console.log(err)
        errorlog(err, message, 'trigger')
    }

    
}

module.exports.help = {
    name: 'trigger',
    aliases: [],
    cooldown: 60
}