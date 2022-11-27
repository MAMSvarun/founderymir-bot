const discord = require('discord.js');

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try {

        const amount = interaction.options.getNumber(`amount`)

        let deleteAmount;

        if (!amount) {

            deleteAmount = 1

        } else if (amount < 0) {

            return interaction.reply({ content: `**The amount should not be less than 100**`, ephemeral: true })

        } else if (amount > 100) {

            deleteAmount = 100
            return interaction.reply({ content: `**You cannot delete more than 100 messages, so just deleting 100 messages**`, ephemeral: true })

        } else {

            deleteAmount = amount

        }


        // deleteing the total msgs (the amount you want) from the channel
        interaction.channel.bulkDelete(deleteAmount, true);

        if (deleteAmount == 1) {

            // sends a msg when the msgs are deleted
            let embed7 = new discord.MessageEmbed()
                .setColor('GREEN')
                .setDescription(`**Successfully deleted ${deleteAmount} message**`)
            await interaction.reply({ embeds: [embed7], ephemeral: true})

        } else {
            
            // sends a msg when the msgs are deleted
            let embed7 = new discord.MessageEmbed()
                .setColor('GREEN')
                .setDescription(`**Successfully deleted ${deleteAmount} messages**`)
            await interaction.reply({ embeds: [embed7], ephemeral: true})

        }



        const modlogChannel = Client.channels.cache.find((c) => c.name === 'modlogs')
        const embed = new discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Action Took: Message(s) deleted')
            .addFields(
                { name: 'Action Took by:', value: `**${interaction.user.tag}**(${interaction.user.id})` },
                { name: `In:`, value: `${interaction.channel}` },
                { name: `Number of messages got deleted:`, value: `${deleteAmount}` }
            )
            .setTimestamp()
        modlogChannel.send({ embeds: [embed] })

    } catch (err) {
        console.log(err)
        slasherrorlog(err, interaction, 'clear')
    }



}
module.exports.help = {
    name: `purge`
}
