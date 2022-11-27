const discord = require('discord.js');
const cooldown = new Set();

module.exports.run = async (Client, message, args, prefix, errorlog) => { // for the cmd handler 

    if (!message.content.startsWith(prefix)) return; // makes sure it starts with the prefix

    try {
        if (cooldown.has(message.author.id)) {
            const spamreply = new discord.MessageEmbed()
                .setTitle("Spamming isn't fun Cadet!")
                .setColor('RANDOM')
                .setDescription("You can ping the bot, but you need to wait `7 ` seconds everytime you use the command")
            return message.reply(spamreply)

        } else {

            message.channel.send({
                embeds:
                    [
                        new discord.MessageEmbed()
                            .setColor(`RANDOM`)
                            .setTitle(":ping_pong: Pinging...")
                    ]
            }).then(msg => {
                const ping = msg.createdTimestamp - message.createdTimestamp // calculation the time between when u send the message and when the bot reply

                const pingreply = new discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(":ping_pong: PONG!")
                    .setDescription(`${ping} ms`)
                msg.edit({ embeds: [pingreply] }) // it will edit the msg to this after it gets the ping!
                message.delete()


                cooldown.add(message.author.id);
                setTimeout(() => {
                    cooldown.delete(message.author.id)
                }, 7000) // 5000 milliseconds = 5sec
            })

        }
    } catch (err) {
        console.log(err)
        errorlog(err, message, 'ping')
    }



}

module.exports.help = {
    name: "ping", // name of the cmd
    aliases: ['ms'], // another names for the cmd
    cooldown: 10
}