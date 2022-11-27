const discord = require('discord.js')
const wait = require(`node:timers/promises`).setTimeout

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try{

    let question = interaction.options.getString(`question`)
    

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
        .setColor('WHITE')
        .setTitle("🎱Ball")
        .setDescription(`**__${question}__**\n:_${response}_`)
        .setTimestamp()
        .setFooter('😏')

        await interaction.deferReply()
        await wait(2000)
        await interaction.editReply({embeds: [answer]})
        
    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, '8ball')
        
    }
    

}

module.exports.help = {
    name: '8ball'
}