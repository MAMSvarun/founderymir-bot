const discord = require('discord.js');
const moment = require("moment");

module.exports.run = async (Client, message, args, prefix, errorlog) => {

    if (!message.content.startsWith(prefix)) return; // make sure its starts with the prefix


    let mentionedMember = message.mentions.members.first() || message.member; // wehnever i type mentioned member that mean message.mentions.members.first() || message.member
    let Member = message.guild.members.cache.get(mentionedMember.id)


    try {



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
            .setThumbnail(mentionedMember.user.displayAvatarURL({dynamic: true}))
            .addField(`**User: **`, `${mentionedMember.user.tag}`) // it will show my tags (e.g. KarimX#9586)
            .addField(`**Username: **`, mentionedMember.user.username || "None") // show the username 
            .addField(`**ID: **`, `${mentionedMember.id}`) // show the ID
            .addField(`**Avatar: **`, `[Click here to view Avatar](${mentionedMember.displayAvatarURL({ dynamic: true })})`) // show the person avatar in a link
            .addField(`Is Bot?`, `${botstatus}`)
            .addField(`**Account Created At: **`, `${moment(mentionedMember.user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}\n **-**${moment(mentionedMember.user.createdAt).startOf('day').fromNow()}`) // when did the acc got created
            .addField(`**Joined The Server At: **`, `${moment(Member.joinedAt).format("MMMM Do YYYY, h:mm:ss a")}\n **-**${moment(Member.joinedAt).startOf('day').fromNow()}`) // when did he join the server
            .addField(`**Roles: [${roles.length}]**`, `${displayRoles}`)  // display his roles
        message.channel.send({ embeds: [userEmbed] }) // sends the embed
    } catch (err) {
        console.log(err)
        errorlog(err, message, 'user')
    }

}

module.exports.help = {
    name: "user",
    aliases: ['whois', 'profile', 'userinfo']
}