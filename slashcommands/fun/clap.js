const discord = require('discord.js')
const wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try {

        let clap = interaction.options.getString(`text`).split('').join(':clap:')
        
        if (clap.length < 1) return interaction.reply({content: '**I need a word, not letter.**', ephemeral: true})

    
        if (clap.length > 200) return interaction.reply({content: 'Oi Oi Oi, send something smaller. Not this big, you will kill me.', ephemeral: true})

        await interaction.deferReply()
        await wait(1000)
        await interaction.editReply({ content: clap })

    } catch (err) {
        console.log(err)
        slasherrorlog(err, interaction, 'clap')

    }
}

module.exports.help = {
    name: 'clap'
}