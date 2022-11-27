const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix, errorlog) => {

    if(!message.content.startsWith(prefix)) return
    if(message.author.id != message.guild.ownerId) return

    let generalembed = new discord.MessageEmbed()
        .setDescription(`In Addition to the **[Discord's Terms of service](https://discord.com/terms)**, users should abide the rules specific to this Server.\n\n`)
        .setColor(`BLURPLE`)
        .addField('\u200b', '\u200b')
        .addFields(
            { name: `1.No Offensive names and Profile Pictures`, value: `Make sure your username and profile picture are not inappropriate,disturbing for others or Offensive. You will be asked to change your name or picture if staff finds them inappropriate.` },
            { name: `2.Be respectful`, value: `You must be respectful with all Users, regardless of your liking towards them. Don't be offensive, rude with others. Don't make false accusations on them or start a fight with them.` },
            { name: `3.No NSFW material`, value: `This is a community server. Keep it clean, don't share or start any kind of Pornographic/Adult/other NSFW material or topics here. ` },
            { name: `4.Keep it Readable`, value: `Use only English unless you are quoting a text from the series. Do not make the reading difficult or uncomfortable; like excess capitals, gibberish, etc.` },
            { name: '5.No Problematic content', value: `Avoid content or topics that are uncomfortable or offensive for other users like Religion, Politics, Discrimination, Racism, Suicide, disgusting stuff, etc.` },
            { name: `6.No Advertisements`, value: `This server is not for advertising your content, whether it be for other communities or streams. ` },
            { name: `7.No Spamming`, value: `Don't send messages, files, media, emojis or links continuosly right after each other. Make sure you message is less than 100 characters. Don't send too many emojis in one message or repeat the same word multiple times. Don't repeat same characters in one word like "okayyyyyyy", "oooookkkkkk".` },
            { name: `8.No unwanted mentions.`, value: `Don't ping the Owner, admins, mods or other users for no reason.` },
            { name: '9.Server Raiding', value: `Raiding or mentions of raiding are not allowed.` },
            { name: `10.Shipping and Simping`, value: `You should simp or ship a character in the channels provided for shipping and simping, doing it in other channels or making conversations about them in other channels are not Allowed.` },
            { name: `11.Roleplay`, value: `Roleplay of any character should be done only in the channels under the Roleplay category. Roleplay is strictly prohibited in the other channels. ` },
            { name: `12.No Sharing of Personal information`, value: `Don't disclose your DMs publicly or share your personal information with others, not even in the DMs. Maintain your privacy properly.` },
            { name: `13.No Shitposting or meme/topic overuse`, value: `Do not flood the channels with meaningless trashy conversations. Do not overuse memes or topics of discussion.` },

        )
    message.channel.send({ embeds: [generalembed] })

    let moderationembed = new discord.MessageEmbed()
        .setColor(`BLURPLE`)
        .setTitle(`**MODERATION DISCLAIMER:construction_worker:**`)
        .setDescription(`🔴If you see someone Breaking the rules, **Report it** through the \`!report\` command. Don't wait till the moderators take action on it. __If you don't report it, then don't complain later that the moderators didn't handle it__.\n🔴If you break a rule and an action isn't taken on you, it doesn't mean that you can continue breaking the rules, __Action will be taken anytime on you__.\n🔴Don't post or discuss about your DM warnings or actions took on you in the server.\n🔴Once an Action is took on a User, don't make useless conversations about it.\n🔴__Do not test or try to bypass the bot filters__ or don't encourage others to do it.\n🔴Once you break a rule, don't try to cover it with saying "_I just tested it_", "_Don't take it serious_", "_Its just a joke_", you can joke within the rules. Breaking rules isn't fun anywhere.\n🔴Keep your DMs open for moderators and the bots, you will receive messages from them, don't block them.\n🔴When a moderator or bot is dealing with an issue, either stay silent or try to help them. Don't fuel the issue.`)


    message.channel.send({ embeds: [moderationembed] })

    let actionembed = new discord.MessageEmbed()
        .setColor(`BLURPLE`)
        .setTitle(`ACTIONS`)
        .setDescription(`**⚠️WARNING**- __You will be warned for breaking any rule.__\n3 Warns - __🔇TempMute__\n 5 Warns - _🔇Mute Until the moderators Unmute you_\n6 Warns - __:boot:Kick__\n**🔇MUTE/:boot:KICK**- _For continued offenses after warnings or for more severe cases where warning isn't enough_\n**🚫SOFTBAN**- (All your roles will be removed making you unable to access any channel except the ban appeal) _For multiple warns within a short period of time or for getting muted so many times._\n**🚫⚠️PERMABAN**- (Banned from the server) _For severe and deliberate rule violations; joining to commit rule-breaking actions; breaking Discord's ToS; or being a continuous source of problems._\n──────────────────────────────────────────────────:bangbang:**__Report Rule Breaking when you see it.__** **Users encouraging others to break the rules, assisting them to do so in any way, or covering them up by avoiding to report, risk receiving the same punishment.:bangbang:**`)

    message.channel.send({ embeds: [actionembed] })

    let modmail = message.guild.members.cache.get('877756368394788864')
    const admins = message.guild.roles.cache.find((r) => r.name == 'Premier[Admin]')
    const mods = message.guild.roles.cache.find((r) => r.name == 'Squad Leaders[Mod]')
    let supportembed = new discord.MessageEmbed()
        .setColor(`BLURPLE`)
        .setTitle(`SUPPORT`)
        .setDescription(`**Incase you need help with something, you can get support through these:-**\n\n ⚪${modmail} - You can contact moderators by messaging this bot.\n⚪ ${admins} ${mods} - You can ping the admins and mods for help(Don't ping for no reason)`)

    message.channel.send({ embeds: [supportembed] })

    const row = new discord.MessageActionRow()
        .addComponents(new discord.MessageButton()
            .setEmoji('✅')
            .setStyle(`SECONDARY`)
            .setCustomId(`accepted`)
        )

    let readembed = new discord.MessageEmbed()
        .setColor(`BLURPLE`)
        .setTitle(`⬆️PLEASE TAKE YOUR TIME TO READ THE RULES|EST TIME: 5MIN⬆️`)
        .setDescription(`●Please click the button below to accept to these rules.\n●Not reading them doesn't mean you are excused from following them. `)

    message.channel.send({ embeds: [readembed], components: [row] })




    message.delete()
}

module.exports.help = {
    name: 'rules',
    aliases: []
}
