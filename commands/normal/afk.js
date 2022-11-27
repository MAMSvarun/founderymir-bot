const discord = require(`discord.js`);
const afkSchema = require(`../../schema/afkSchema`)

module.exports.run = async (Client, message, args, prefix, errorlog) => {

    try {

        let reason = args.slice(0).join(' ')

        let name;
        if(message.member.nickname == null) {
            name = message.author.username
        } else {
            name = message.member.nickname
        }


        let afk_data;
        afk_data = await afkSchema.findOne({
            userId: message.author.id,
            guildId: message.guild.id
        })

        if (!afk_data) {
            afk_data = await afkSchema.create({
                userId: message.author.id,
                guildId: message.guild.id,
                username: name
    
            })
        }

        if (!reason) {
            reason = afk_data.reason
        }

        afk_data.afk = true
        afk_data.username = name
        afk_data.reason = reason

        await afk_data.save()

        if (!message.member.roles.cache.get(`862605391678275626`)) {

            await message.member.setNickname(`[AFK]${name}`)

        }

        const embed = new discord.MessageEmbed()
            .setColor(`GREEN`)
            .setTitle(`YOU ARE AFK NOW`)
            .setDescription(`**Reason:** \`${reason}\``)


        message.reply({ embeds: [embed]}).then(msg => {
            setTimeout(() => {
                msg.delete()
                message.delete()
            }, 5000);
        })

    } catch (error) {
        console.log(error)
        errorlog(error, message, `afk`)
    }



}

module.exports.help = {
    name: `afk`,
    aliases: []
}