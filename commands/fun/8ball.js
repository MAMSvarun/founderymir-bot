const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if(!message.content.startsWith(prefix)) return;

    let question = args.slice(0).join(" ")
    if(message.mentions.users.first() || message.mentions.roles.first()) return message.reply({content: `**You need to type something, don't mention someone.**`}).then(msg => {
        setTimeout(() => {
            msg.delete()
            message.delete()
        }, 5000);
    })

    if(!question){
        return message.reply('Use the command with a Yes or No question this time.').then(msg => {
            setTimeout(() => {
                msg.delete()
                message.delete()
            }, 5000);
        })
    }

    try {

        const responses = [
            'Yes',
            'No',
            'Maybe',
            'Perhaps',
            'What do you think?',
            'Is Eren Yeagar an idiot?',
            'Maybe in your dreams',
            'Annie leonhart knows the answer',
            "I can't say☺️",
            "Who knows..",
            "I don't think so",
            "Never",
            "An absolute yes",
            "Is levi a caring person?",
            "You lost your brain?",
            "I don't know",
            "Maybe if you stop asking me questions",
            "Is this even a question?",
            'It depends on how Erwin sees it',
            'Silly',
            "You think that I answer for these type of questions?",
            "Huh?",
            "nani:face_with_monocle:?",
            "Is Eren Yeagar a Villain",
            "What do you think Jean Kirschtein's answer for this question will be?",
            'Connie is an Idiot, so yes.',
            'Ask Levi.',
            'Close discord, switch off your device and sleep.'
            
        ]
    
        let response = responses[Math.floor(Math.random() * responses.length)];
    
        const answer = new discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("🎱8Ball")
        .setDescription(`**__${question}__**\n:__${response}__`)
        .setTimestamp()
        .setFooter('😏')
    
        message.reply({embeds: [answer]})
        
    } catch (error) {
        console.log(error)
        errorlog(error, message, '8ball')
        
    }
    

}

module.exports.help = {
    name: '8ball',
    aliases: [],
    cooldown: 10
}