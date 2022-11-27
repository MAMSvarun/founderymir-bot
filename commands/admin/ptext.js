const discord = require(`discord.js`)

module.exports.run = async (Client, message, args, prefix) => {

    if (!message.content.startsWith(prefix)) return
    let ruler = message.guild.roles.cache.get(`862605391678275626`)

    if (!message.member.permissions.has(discord.Permissions.FLAGS.ADMINISTRATOR)) return

    const textembed = new discord.MessageEmbed()
        .setColor(`BLURPLE`)
        .setDescription(`We accept **Partnership** with other servers. Have your own server and want to partner with us? Your server should meet these requirements to partner with us`)
        .addField('\u200b', '\u200b')
        .addFields(
            { name: `1.Minimum 80+ Members.`, value: `Your server should have the minimum number of members to partner with us, since we can't partner with every server.` },
            { name: `2.Good Moderation.`, value: `Your server should have active Admins and Mods who moderate your server, since we partner only with clean servers.` },
            { name: `3.Moderation Bot.`, value: `Your server should have atleast one bot which moderates your server, since we partner only with actively moderated servers.` },
            { name: `4.Enabled community settings.`, value: `Your server should have community settings enabled so you can access more server settings, since we partner only with servers which wants to be a community.` },
            { name: `5.Advertisement Channel.`, value: `Your server shoukd have a channel where we can post the ad of our server.` }

        )

    const texttwo = new discord.MessageEmbed()
        .setColor(`BLURPLE`)
        .setDescription(`What are the benefits of partnering with us?\n\n**•Exchange of members from this server**\n**•Posting your ads in this server.**`)

    const pngembed = new discord.MessageEmbed()
        .setColor(`BLURPLE`)
        .setDescription(`**How to Partner with us?**\n\n•Message any ${ruler} to partner with us`)

    message.channel.send({ embeds: [textembed, texttwo, pngembed] })
}



module.exports.help = {
    name: `ptext`,
    aliases: []
}