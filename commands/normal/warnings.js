const discord = require('discord.js')
const warnModel = require(`../../schema/warnSchema`)
const moment = require('moment')

module.exports.run = async(Client, message, args, prefix, errorlog) => {

    try{

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
        if(!member) return message.reply({content: `**Please mention a User or provide a User ID to check their warnings.**`}).then(msg => {
            setTimeout(() => {
                msg.delete()
                message.delete()
            }, 5000)
        })

        const userWarnings = await warnModel.find({ userId: member.user.id, guildId: message.guild.id })

        if (!userWarnings?.length) return message.reply({ content: `**This user has no warnings.**` }).then(msg => {
            setTimeout(() => {
                msg.delete()
                message.delete()
            }, 5000);
        })

        const embedDescription = userWarnings.map((warn) => {
            const moderator = message.guild.members.cache.get(warn.moderatorId)

            return [
                `**WarnID:** _${warn._id}_`,
                `**Moderator:**${moderator || `Has Left`}`,
                `**Date:** __${moment(warn.timestamp).format(`MMMM Do YYYY`)}__`,
                `Reason: \`${warn.reason}\``
            ].join(`\n`);
        }).join(`\n\n`)

        const embed = new discord.MessageEmbed()
            .setColor(`YELLOW`)
            .setDescription(embedDescription)
            .setTitle(`${member.user.tag}'s warnings`)

        message.channel.send({ embeds: [embed] })
        message.delete()
    



    }catch (error) {
        console.log(error)
        errorlog(error, message, 'warnings')
    }

}

module.exports.help = {
    name: `warnings`,
    aliases: [`warns`]
}