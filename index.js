const Discord = require('discord.js')
const Client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_PRESENCES]
})

module.exports = Client

const fs = require('fs');
const levels = require('discord-xp')
const ultrax = require(`ultrax`)


const { createCmd } = require(`./dataHandler.js`)


//connecting to mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOOSE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(console.log('Connected to Mongo.db'))

levels.setURL(process.env.MONGOOSE)


Client.commands = new Discord.Collection();
Client.aliases = new Discord.Collection();
Client.slashCommands = new Discord.Collection();


const guildSettings = require(`./schema/userSchema.js`)
const afkSchema = require(`./schema/afkSchema`)





Client.on(`ready`, () => {
    Client.user.setStatus(`dnd`)
    Client.user.setActivity(`!help`, { type: `PLAYING` })
    console.log(`Founder Ymir is Online`)

    createCmd(Client, `859441727421284362`)
})



//when member joins
Client.on('guildMemberAdd', async (member) => {

    let data;
    data = await guildSettings.findOne({
        userId: member.id
    })

    if (!data) {
        data = await guildSettings.create({
            guildId: `859441727421284362`,
            userId: member.id
        })
    }


    //setting the no.of members, bots
    await Client.channels.cache.get('867687377459478539').setName(`Total: ${member.guild.memberCount}`)
    await Client.channels.cache.get('867687381107474452').setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`)
    await Client.channels.cache.get('867687384672763904').setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`)


    //adding roles to the member
    if (member.bot == true) return

    let guild = Client.guilds.cache.get('859441727421284362')

    if (data.muted == true) {

        let mutedRole = guild.roles.cache.find(rl => rl.name == `Muted`)
        member.roles.add(mutedRole)
        member.send({
            embeds:
                [
                    new Discord.MessageEmbed()
                        .setColor(`YELLOW`)
                        .setTitle(`You are Muted!`)
                        .setDescription(`You got muted in the server before and the admins didn't unmute you yet.`)
                ]
        })
    }
    if (data.softbanned == true) {

        return member.send({
            embeds:
                [
                    new Discord.MessageEmbed()
                        .setColor(`YELLOW`)
                        .setTitle(`You are softbanned!`)
                        .setDescription(`You got softbanned in the server before and the admins didn't unban you yet.`)
                ]
        })
    }

    let role = guild.roles.cache.find((r) => r.name === `Citizen`)

    await member.roles.add(role.id)



    //sending the welcome msg
    let welcomechannel = Client.channels.cache.get(`864767675044331530`)
    const embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Welcome to the new Cadet.')
        .setImage('https://c.tenor.com/d0WCJfhrUxcAAAAd/aot.gif')
        .setDescription(`**CADET ${member}**\nWelcome to **This is AOT!**\nYou are our #${member.guild.memberCount} member\nWe hope you will become a Strong soldier.`)
        .setFooter(`${member.user.username} Please go to the Rules channel`)
    welcomechannel.send({ embeds: [embed] })





    //sending msg in new member lounge
    let lounge = Client.channels.cache.get('890610189873590283')

    let getroles = Client.channels.cache.get('913763683409203201')
    let rules = Client.channels.cache.get('864774132704477224')

    lounge.send({ content: `Welcome to **This is AoT** ${member}. Please read the Rules at ${rules} and Self-Assign _Server and Roleplay_ roles at ${getroles}. Get the ***Otaku*** role to access the Members chat.` })


})



//when member leaves
Client.on('guildMemberRemove', async (member) => {

    await Client.channels.cache.get('867687377459478539').setName(`Total: ${member.guild.memberCount}`)
    await Client.channels.cache.get('867687381107474452').setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`)
    await Client.channels.cache.get('867687384672763904').setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`)

    if (member.bot == true) return

    levels.deleteUser(member.user.id, `859441727421284362`)

    let goodbyechannel = Client.channels.cache.get(`864767706476314654`)
    let embed = new Discord.MessageEmbed()
        .setColor('PURPLE')
        .setTitle('Goodbye Soldier')
        .setDescription(`***${member.user.tag}***....\nWe hope you had a Great time here.\n**Goodbye:wave:...**`)
        .setFooter(`${member.user.username} has left this server`)
    goodbyechannel.send({ embeds: [embed] })


})





ultrax.boost.init(Client)

Client.on(`boost`, async (member) => {

    const channel = Client.channels.cache.get(`864774181525913610`)
    const avatar = member.user.displayAvatarURL({ format: `png` })
    const boostcard = ultrax.boostImage(avatar)

    let embed = new Discord.MessageEmbed()
        .setColor(`#D900FB`)
        .setImage(boostcard)
        .setDescription(`**${member} had boosted this server:partying_face:!**\nThank you so much **${member.user.username}**`)

    channel.send({ embeds: [embed] })

})



// Commands Handler 

// get into the cmds folder
fs.readdirSync('./commands/').forEach(dir => {

    //in the cmds folder, we gonna check for the category
    fs.readdir(`./commands/${dir}`, (err, files) => {

        // console log err (catch err)
        if (err) throw err;

        // checking if the files ends with .js if its a javascript file
        var jsFiles = files.filter(f => f.split(".").pop() === "js");

        // if there is no cmds in the file it will return
        if (jsFiles.length <= 0) {
            console.log("Can't find any commands!");
            return;
        }


        jsFiles.forEach(file => {

            // console the loaded cmds 
            var fileGet = require(`./commands/${dir}/${file}`);
            console.log(`File ${file} was loaded`)

            // gonna let the cmds run
            try {
                Client.commands.set(fileGet.help.name, fileGet);

                // it search in the cmds folder if there is any aliases
                fileGet.help.aliases.forEach(alias => {
                    Client.aliases.set(alias, fileGet.help.name);

                })


            } catch (err) {
                // catch err in console  
                return console.log(err);
            }
        });
    });
});





//slash command handler
fs.readdirSync('./slashcommands/').forEach(dir => {

    fs.readdir(`./slashcommands/${dir}`, (err, files) => {

        if (err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js");

        if (jsFiles.length <= 0) {
            console.log("{SLASH COMMAND} Can't find any commands!");
            return;
        }

        jsFiles.forEach(file => {


            var fileGet = require(`./slashcommands/${dir}/${file}`);
            console.log(`{SLASH COMMAND} File ${file} was loaded`)

            try {
                Client.slashCommands.set(fileGet.help.name, fileGet);

            } catch (err) {

                return console.log(err);
            }
        });
    });
});




//errorlog function
function errorlog(err, message, name) {
    message.channel.send({ content: `An error has Occured. Notification is sent to the mods.` })
    const errorlog = Client.channels.cache.get('906933473447669850')
    errorlog.send({
        embeds: [new Discord.MessageEmbed()
            .setTitle('Error Occured')
            .setDescription(`Error: \`${err}\``)
            .addFields(
                { name: `Triggered By:`, value: `${message.author.tag}` },
                { name: `Triggered In:`, value: `Channel: ${message.channel}` },
                { name: `Command:`, value: `${name}` },
                { name: `Message:`, value: `${message}` }
            )
            .setColor('RED')
            .setTimestamp()
            .setFooter(`Error in ${Client.user.username}`, Client.user.displayAvatarURL({ dynamic: true }))]
    })
}


function slasherrorlog(err, interaction, name) {
    interaction.reply({ content: `An error has Occured. Notification is sent to the mods.` })
    const errorlogchannel = Client.channels.cache.get('906933473447669850')
    errorlogchannel.send({
        embeds: [new Discord.MessageEmbed()
            .setTitle('Error Occured')
            .setDescription(`Error: \`${err}\``)
            .addFields(
                { name: `Triggered By:`, value: `${interaction.user.tag}` },
                { name: `Triggered In:`, value: `Channel: ${interaction.channel}` },
                { name: `Command:`, value: `${name}` },
                { name: `Interaction:`, value: `${interaction}` }
            )
            .setColor('RED')
            .setTimestamp()
            .setFooter(`Error in ${Client.user.username}`, Client.user.displayAvatarURL({ dynamic: true }))]
    })
}










//message event
Client.on("messageCreate", async (message, guild) => {

    //preventing DMs and bot replies
    if (message.channel.type === 'DM') return
    if (message.author.bot == true) return


    
    const announcement = message.guild.channels.cache.get('864774181525913610')




    //spam control
    if (message.content.length >= 150) {

        if (message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) return
        
        if (message.channel === announcement) return

        if (message.content.includes('tenor.com' || 'youtube.com')) return

        message.channel.send({ content: `**${message.author} You are warned for Spamming.**` }).then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 5000);
        })
        return message.delete()
    }


    let name;
    if (message.member.nickname == null) {
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

    if (afk_data.afk == true) {
        if (!message.member.roles.cache.get(`862605391678275626`)) {
            message.member.setNickname(afk_data.username)
        }

        afk_data.reason = `Not Specified`
        afk_data.afk = false
        afk_data.username = null

        await afk_data.save()

        message.reply({ content: `**You are no longer AFK!**` }).then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 5000);
        })
    }


    if (message.mentions.members.first()) {

        let name2
        if (message.mentions.members.first().nickname == null) {
            name2 = message.mentions.users.first().username
        } else {
            name2 = message.mentions.members.first().nickname
        }

        let afk_data2;
        afk_data2 = await afkSchema.findOne({
            userId: message.mentions.members.first().id,
            guildId: message.guild.id
        })

        if (!afk_data2) {
            afk_data2 = await afkSchema.create({
                userId: message.mentions.members.first().id,
                guildId: message.guild.id,
                username: name2
            })
        }

        if (afk_data2.afk == true) {
            const embed = new Discord.MessageEmbed()
                .setColor(`YELLOW`)
                .setTitle(`${message.mentions.users.first().username} is AFK!`)
                .setDescription(`${message.mentions.users.first().tag}: _${afk_data2.reason}_`)

            message.reply({ embeds: [embed] })
        }
    }



    //declaring variables for commands
    let prefix = '!'
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1)

    let commands = Client.commands.get(cmd.slice(prefix.length)) || Client.commands.get(Client.aliases.get(cmd.slice(prefix.length)));

    if (commands) {
        commands.run(Client, message, args, prefix, errorlog)
    }



    //level system
    const randomAmountOfXp = Math.floor(Math.random() * 10) + 1; // Min 1, Max 50
    const hasLeveledUp = await levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
        const user = await levels.fetch(message.author.id, message.guild.id);
        if (user.level <= 14) {
            message.channel.send({ content: `**Cadet** ${message.author}, You have advanced to **${user.level}** level.` });
        } else {
            message.channel.send({ content: `**Soldier** ${message.author}, You have advanced to **${user.level}** level.` });
        }

        if (user.level == 5) {
            let role = message.guild.roles.cache.find((role) => role.name == 'Cadet Corp')
            if (!role) await message.guild.roles.create({
                data: {
                    name: 'Cadet Corp',
                    color: '#af4902'
                }
            }).catch((err) => console.log(err))
            role = message.guild.roles.cache.find((role) => role.name == 'Cadet Corp')
            if (message.member.roles.cache.has(role.id)) return
            else {
                await message.member.roles.add(role.id)
                message.channel.send({ content: `Cadet ${message.author}, you are a **${role.name}** now!` }).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000);
                })

            }
        }

        if (user.level == 10) {
            let role = message.guild.roles.cache.find((role) => role.name == 'Graduated Cadet')
            if (!role) await message.guild.roles.create({
                data: {
                    name: 'Graduated Cadet',
                    color: '#90a400'
                }
            }).catch((err) => console.log(err))
            role = message.guild.roles.cache.find((role) => role.name == 'Graduated Cadet')
            if (message.member.roles.cache.has(role.id)) return
            else {
                await message.member.roles.add(role.id)
                message.channel.send({ content: `Cadet ${message.author}, you are a **${role.name}** now!` }).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000);
                })

            }
        }

        if (user.level == 15) {
            let role = message.guild.roles.cache.find((role) => role.name == 'Garrison')
            if (!role) await message.guild.roles.create({
                data: {
                    name: 'Garrison',
                    color: '#a40000'
                }
            }).catch((err) => console.log(err))
            role = message.guild.roles.cache.find((role) => role.name == 'Garrison')
            if (message.member.roles.cache.has(role.id)) return
            else {
                await message.member.roles.add(role.id)
                message.channel.send({ content: `Soldier ${message.author}, you are in **${role.name}** now!` }).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000);
                })

            }
        }

        if (user.level == 20) {
            let role = message.guild.roles.cache.find((role) => role.name == 'Military Police')
            if (!role) await message.guild.roles.create({
                data: {
                    name: 'Military Police',
                    color: '#008b0b'
                }
            }).catch((err) => console.log(err))
            role = message.guild.roles.cache.find((role) => role.name == 'Military Police')
            if (message.member.roles.cache.has(role.id)) return
            else {
                await message.member.roles.add(role.id)
                message.channel.send({ content: `Soldier ${message.author}, you are in **${role.name}** now!` }).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000);
                })

            }
        }

        if (user.level == 30) {
            let role = message.guild.roles.cache.find((role) => role.name == 'Survey Corps')
            if (!role) await message.guild.roles.create({
                data: {
                    name: 'Survey Corps',
                    color: '#0032db'
                }
            }).catch((err) => console.log(err))
            role = message.guild.roles.cache.find((role) => role.name == 'Survey Corps')
            if (message.member.roles.cache.has(role.id)) return
            else {
                await message.member.roles.add(role.id)
                message.channel.send({ content: `Soldier ${message.author}, you are in **${role.name}** now!` }).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000);
                })

            }
        }

        if (user.level == 40) {
            let role = message.guild.roles.cache.find((role) => role.name == 'Hange Squad')
            if (!role) await message.guild.roles.create({
                data: {
                    name: 'Hange Squad',
                    color: '#ec8f00'
                }
            }).catch((err) => console.log(err))
            role = message.guild.roles.cache.find((role) => role.name == 'Hange Squad')
            if (message.member.roles.cache.has(role.id)) return
            else {
                await message.member.roles.add(role.id)
                message.channel.send({ content: `Soldier ${message.author}, you are in **${role.name}** now!` }).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000);
                })

            }
        }

        if (user.level == 50) {
            let role = message.guild.roles.cache.find((role) => role.name == 'Levi Squad')
            if (!role) await message.guild.roles.create({
                data: {
                    name: 'Levi Squad',
                    color: '#ec00d3'
                }
            }).catch((err) => console.log(err))
            role = message.guild.roles.cache.find((role) => role.name == 'Levi Squad')
            if (message.member.roles.cache.has(role.id)) return
            else {
                await message.member.roles.add(role.id)
                message.channel.send({ content: `Soldier ${message.author}, you are in **${role.name}** now! You are now eligible to become a Mod <:letsgo:868081623839682590>` })
            }
        }

    }



})



//slash command
Client.on('interactionCreate', async interaction => {

    if (interaction.isCommand()) {
        const slashCommands = Client.slashCommands.get(interaction.commandName)

        if (slashCommands) slashCommands.run(Client, interaction, slasherrorlog)
    }

    if (interaction.isButton()) {
        if (interaction.customId === 'accepted') {
            return interaction.reply({ content: 'Thanks for accepting to our rules, now you can Self-Assign roles.', ephemeral: true })
        }
    }


    if (interaction.isSelectMenu()) {
        if (interaction.customId == 'rprole') {

            const member = await interaction.message.guild.members.fetch({
                user: interaction.user.id,
                force: true
            })

            //reiss family role
            if (interaction.values == 'reiss') {


                if (!member.roles.cache.has('886478407611858964')) {

                    await member.roles.add('886478407611858964')
                    return interaction.reply({ content: `[RP]Reiss Family role has been added to you.`, ephemeral: true })

                } else {

                    await member.roles.remove('886478407611858964')
                    return interaction.reply({ content: `[RP]Reiss Family role has been removed from you`, ephemeral: true })


                }


            }

            if (interaction.values == 'commander') {


                if (!member.roles.cache.has('862615199617384489')) {

                    await member.roles.add('862615199617384489')
                    return interaction.reply({ content: `[RP]Commanders role has been added to you.`, ephemeral: true })

                } else {

                    await member.roles.remove('862615199617384489')
                    return interaction.reply({ content: `[RP]Commanders role has been removed from you`, ephemeral: true })


                }


            }

            if (interaction.values == 'military') {


                if (!member.roles.cache.has('864744236452806676')) {

                    await member.roles.add('864744236452806676')
                    return interaction.reply({ content: `[RP]Military Police role has been added to you.`, ephemeral: true })

                } else {

                    await member.roles.remove('864744236452806676')
                    return interaction.reply({ content: `[RP]Military Police role has been removed from you`, ephemeral: true })


                }


            }

            if (interaction.values == 'levisquad') {


                if (!member.roles.cache.has('862605692812394507')) {

                    await member.roles.add('862605692812394507')
                    return interaction.reply({ content: `[RP]Levi Squad role has been added to you.`, ephemeral: true })

                } else {

                    await member.roles.remove('862605692812394507')
                    return interaction.reply({ content: `[RP]Levi Squad role has been removed from you`, ephemeral: true })


                }


            }

            if (interaction.values == 'hangesquad') {


                if (!member.roles.cache.has('862607545335545856')) {

                    await member.roles.add('862607545335545856')
                    return interaction.reply({ content: `[RP]Hange Squad role has been added to you.`, ephemeral: true })

                } else {

                    await member.roles.remove('862607545335545856')
                    return interaction.reply({ content: `[RP]Hnage Squad role has been removed from you`, ephemeral: true })


                }


            }

            if (interaction.values == 'warriors') {


                if (!member.roles.cache.has('862606910234427452')) {

                    await member.roles.add('862606910234427452')
                    return interaction.reply({ content: `[RP]Warriors role has been added to you.`, ephemeral: true })

                } else {

                    await member.roles.remove('862606910234427452')
                    return interaction.reply({ content: `[RP]Warriors role has been removed from you`, ephemeral: true })


                }


            }

            if (interaction.values == 'yeagarists') {


                if (!member.roles.cache.has('888010906406109225')) {

                    await member.roles.add('888010906406109225')
                    return interaction.reply({ content: `[RP]Yeagarists role has been added to you.`, ephemeral: true })

                } else {

                    await member.roles.remove('888010906406109225')
                    return interaction.reply({ content: `[RP]Yeagarists role has been removed from you`, ephemeral: true })


                }


            }

            if (interaction.values == 'surveycorps') {


                if (!member.roles.cache.has('868007380452012073')) {

                    await member.roles.add('868007380452012073')
                    return interaction.reply({ content: `[RP]Survey Corps role has been added to you.`, ephemeral: true })

                } else {

                    await member.roles.remove('868007380452012073')
                    return interaction.reply({ content: `[RP]Survey Corps role has been removed from you`, ephemeral: true })


                }


            }

            if (interaction.values == 'garrison') {


                if (!member.roles.cache.has('864744474466058270')) {

                    await member.roles.add('864744474466058270')
                    return interaction.reply({ content: `[RP]Garrison Regiment role has been added to you.`, ephemeral: true })

                } else {

                    await member.roles.remove('864744474466058270')
                    return interaction.reply({ content: `[RP]Garrison Regiment role has been removed from you`, ephemeral: true })


                }


            }

            if (interaction.values == 'cadet') {


                if (!member.roles.cache.has('864804982062841876')) {

                    await member.roles.add('864804982062841876')
                    return interaction.reply({ content: `[RP]104th Cadet Corps role has been added to you.`, ephemeral: true })

                } else {

                    await member.roles.remove('864804982062841876')
                    return interaction.reply({ content: `[RP]104th Cadet Corps role has been removed from you`, ephemeral: true })


                }


            }

            if (interaction.values == 'special') {


                if (!member.roles.cache.has('868007044958015508')) {

                    await member.roles.add('868007044958015508')
                    return interaction.reply({ content: `[RP]Special Citizen role has been added to you.`, ephemeral: true })

                } else {

                    await member.roles.remove('868007044958015508')
                    return interaction.reply({ content: `[RP]Special Citizen role has been removed from you`, ephemeral: true })


                }


            }
        }

        if (interaction.customId == 'serverroles') {

            const member = await interaction.message.guild.members.fetch({
                user: interaction.user.id,
                force: true
            })

            if (interaction.values == 'otaku') {

                if (!member.roles.cache.has(`905091900690804767`)) {

                    await member.roles.add(`905091900690804767`)
                    return interaction.reply({ content: `Otaku role has been added to you.`, ephemeral: true })

                } else {

                    await member.roles.remove(`905091900690804767`)
                    return interaction.reply({ content: `Otaku role has been removed from you.`, ephemeral: true })
                }
            }

            if (interaction.values == 'other') {

                if (!member.roles.cache.has(`905091198216208474`)) {

                    await member.roles.add(`905091198216208474`)
                    return interaction.reply({ content: `Other Anime Otaku role has been added to you.`, ephemeral: true })

                } else {

                    await member.roles.remove(`905091198216208474`)
                    return interaction.reply({ content: `Other Anime Otaku role has been removed from you.`, ephemeral: true })

                }
            }

            if (interaction.values == 'simp') {

                if (!member.roles.cache.has(`887649606987579442`)) {

                    member.roles.add(`887649606987579442`)
                    return interaction.reply({ content: `Simp Squad role has been added to you.`, ephemeral: true })

                } else {

                    await member.roles.remove(`887649606987579442`)
                    return interaction.reply({ content: `Simp Squad has been removed from you.`, ephemeral: true })

                }
            }


            if (interaction.values == 'poll') {

                if (!member.roles.cache.has(`934159805424210030`)) {

                    await member.roles.add(`934159805424210030`)
                    return interaction.reply({ content: `Poll Ping role has been added to you.`, ephemeral: true })

                } else {

                    await member.roles.remove(`934159805424210030`)
                    return interaction.reply({ content: `Poll Ping role has been removed from you.`, ephemeral: true })

                }
            }

        }
    }
})




Client.login(process.env.TOKEN)
