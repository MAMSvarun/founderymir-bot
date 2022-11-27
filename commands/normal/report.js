const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return;

    let user = message.mentions.users.first()
    if (!user) return message.reply('**Please mention a User to Report them!**').then(msg => {
        setTimeout(() => {
            msg.delete()
            message.delete()
        }, 5000);
    })

    let reason = args.slice(1).join(" ")
    if (!reason) return message.reply('**Please provide the Reason on reporting them.**').then(msg => {
        setTimeout(() => {
            msg.delete()
            message.delete()
        }, 5000);
    })

    try {
        let Avatar = user.displayAvatarURL();
        let Channel = message.guild.channels.cache.find((ch) => ch.name === "reports") //report @KarimX raosnfdfd
        if (!Channel) return message.channel.send("There is no channel called reports, please contact a mod or create a channel called `reports`");

        const embed = new discord.MessageEmbed()
            .setTitle('New Report!')
            .setDescription(`Member \`${message.author.tag}\` has reported user \`${user.tag}\`!`)
            .setColor("RED")
            .setThumbnail(Avatar)
            .addFields(
                { name: "Reported By:", value: `${message.author.tag}\n_${message.author.id}_`, inline: true },
                { name: "Reported On:", value: `${user.tag}\n_${user.id}_`, inline: true },
                { name: "Reason:", value: `\`${reason}\``, inline: true }
            )
            .setTimestamp()
        Channel.send({ embeds: [embed] })
        message.reply({ content: '**Reported the User successfully. Admins will check your report and will take an Action in 24Hours.**' }).then(msg => {
            setTimeout(() => {
                msg.delete()
                message.delete()
            }, 5000);
        })
    } catch (err) {
        console.log(err)
        errorlog(err, message, 'report')
    }

}

module.exports.help = {
    name: "report",
    aliases: []
}