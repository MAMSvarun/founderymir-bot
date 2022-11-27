const discord = require('discord.js');
const moment = require("moment");
const wait = require(`node:timers/promises`).setTimeout

module.exports.run = async (Client, interaction, slasherrorlog) => {

    try {


        let mentionedMember = interaction.options.getMember(`user`)
        let Member = interaction.guild.members.cache.get(mentionedMember.id)



        const roles = mentionedMember.roles.cache // getting the roles of the person
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);

        let displayRoles;

        // if he have less then 20 role, display it
        if (roles.length < 20) {
            displayRoles = roles.join(' ')
            if (roles.length < 1) displayRoles = "None" // if no roles say None

        } else {

            // if he have more then 20 just display 20 roles
            displayRoles = roles.slice(20).join(' ')
        }

        let botstatus
        if (mentionedMember.user.bot) botstatus = 'Yes'
        if (!mentionedMember.user.bot) botstatus = 'No'

        const userEmbed = new discord.MessageEmbed() // create an embed
            .setColor(`#3333cc`)
            .setAuthor(`User information of ${mentionedMember.user.username}`, mentionedMember.user.displayAvatarURL({ dynamic: true, size: 2048 })) // User information of: KarimX and it will display my pfp
            .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                {name: `**User: **`, value: `${mentionedMember.user.tag}`, inline: true},
                {name: `**Username: **`, value: mentionedMember.user.username || "None", inline: true},
                {name: `**ID: **`, value: `${mentionedMember.id}`, inline: true},
                {name: `**Avatar: **`, value: `[Click here to view Avatar](${mentionedMember.displayAvatarURL({ dynamic: true })})`, inline: true},
                {name: `Is Bot?`, value: `${botstatus}`, inline: true},
                {name: `**Account Created At: **`, value: `${moment(mentionedMember.user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}\n **-**${moment(mentionedMember.user.createdAt).startOf('day').fromNow()}`, inline: true},
                {name: `**Joined The Server At: **`, value: `${moment(Member.joinedAt).format("MMMM Do YYYY, h:mm:ss a")}\n **-**${moment(Member.joinedAt).startOf('day').fromNow()}`, inline: true}

            )
            .addField(`**Roles: [${roles.length}]**`, `${displayRoles}`)  // display his roles

        await interaction.deferReply()
        await wait(1000)
        await interaction.editReply({ embeds: [userEmbed] }) // sends the embed

    } catch (err) {
        console.log(err)
        slasherrorlog(err, interaction, 'userprofile')
    }

}

module.exports.help = {
    name: "userprofile"
}