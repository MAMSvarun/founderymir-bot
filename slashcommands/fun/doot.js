const discord = require('discord.js')
const wait = require(`node:timers/promises`).setTImeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {
    if (!message.content.startsWith(prefix)) return

    try {
        let doot = interaction.options.getString(`text`).split('').join(':skull::trumpet:')
        
        
        if (doot.length < 1) return interaction.reply({content: '**I need a word, not letter.**', ephemeral: true})

        if (doot.length > 200) return interaction.reply({content: '**Oi Oi Oi, send something smaller. Not this big, you will kill me.**', ephemeral: true})

        await interaction.deferReply()
        await wait(1000)
        await interaction.editReply({ content: doot })
        
    } catch (err) {
        console.log(err)
        slasherrorlog(err, interaction, 'doot')
    }
}

module.exports.help = {
    name: 'doot'
}