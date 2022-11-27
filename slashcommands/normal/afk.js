const discord = require(`discord.js`);
const wait = require(`node:timers/promises`).setTimeout;
const afkSchema = require(`../../schema/afkSchema`)

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try {

        let reason = interaction.options.getString(`reason`)

        let name;
        if(interaction.member.nickname == null) {
            name = interaction.user.username
        } else {
            name = interaction.member.nickname
        }


        let afk_data;
        afk_data = await afkSchema.findOne({
            userId: interaction.user.id,
            guildId: interaction.guild.id
        })

        if (!afk_data) {
            afk_data = await afkSchema.create({
                userId: interaction.user.id,
                guildId: interaction.guild.id,
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

        if (!interaction.member.roles.cache.get(`862605391678275626`)) {

            await interaction.member.setNickname(`[AFK]${name}`)

        }

        const embed = new discord.MessageEmbed()
            .setColor(`GREEN`)
            .setTitle(`YOU ARE AFK NOW`)
            .setDescription(`**Reason:** \`${reason}\``)

        await interaction.deferReply({ephemeral: true})
        await wait(3000)
        await interaction.editReply({ embeds: [embed] })

    } catch (error) {
        console.log(error)
        slasherrorlog(error, interaction, `afk`)
    }



}

module.exports.help = {
    name: `afk`
}
