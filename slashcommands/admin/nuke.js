const discord = require('discord.js');

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try {

        //getting the channel's id that is gonna be nuked
    var channel = Client.channels.cache.get(interaction.channel.id)

    // getting the position of the channel by the category
    var posisi = channel.position

    // clonning the channel
    channel.clone().then((channel2) => {

        // sets the position of the new channel
        channel2.setPosition(posisi)

        // deleting the nuked channel
        channel.delete()

        //sending a msg in the new channel
        let embed = new discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription(`**Successfully Nuked the Channel**`)
            .setImage(`https://c.tenor.com/LDGMZvpZi0cAAAAM/we-do-a-little-trolling-attack-on-titan.gif`)
        channel2.send({ embeds: [embed] })
    })
    const modlogChannel = Client.channels.cache.find((c) => c.name === 'modlogs')
    const embed = new discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Action Took: Channel got Nuked')
        .addFields(
            { name: 'Channel:', value: `#${interaction.channel.name}` },
            { name: 'Action Took by:', value: `**${interaction.user.tag}**(${interaction.user.id})` }
        )
        .setTimestamp()
    modlogChannel.send({ embeds: [embed] })
        
    } catch (err) {
        console.log(err)
        slasherrorlog(err, interaction, 'nuke')
    }

    
}



module.exports.help = {
    name: `nuke`
}
