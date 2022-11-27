const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix, errorlog) => {

    if(!message.content.startsWith(prefix)) return

    try {
        const creator = message.guild.members.cache.get(`760069567749423104`)

        const commandName = args.slice(0).join(' ')
        if (commandName == `admin`) {
            if (!message.member.permissions.has(discord.Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply({ content: `**Only Admins and Mods can check the Moderation commands**` }).then(msg => {
                setTimeout(() => {
                    msg.delete()
                    message.delete()
                }, 5000)
            })
            const adminembed = new discord.MessageEmbed()
                .setColor(`RANDOM`)
                .setAuthor(`Founder Ymir`, Client.user.displayAvatarURL({ dynamic: true }))
                .setTitle(`Help Section of Founder Ymir Bot`)
                .setDescription(`***Kon'nichiwa ${message.author.username}***\n**Welcome to the Help Section for Admin and Mods.**\n**My prefix**: \`!\`\n\n_See the list of Available commands for Moderation by selecting the category below_.\n\n`)
                .setFooter(`Developed by Levi Ackerman#8058`, creator.user.displayAvatarURL({ dynamic: true }))

            const adminrow = new discord.MessageActionRow()
                .addComponents(
                    new discord.MessageSelectMenu()
                        .setCustomId(`admin-help`)
                        .setPlaceholder(`Choose a category to check commands`)
                        .addOptions([
                            {
                                label: `Level`,
                                description: `Commands related to user levels`,
                                value: `admin-levels`
                            },

                            {
                                label: `Mute`,
                                description: `Commands related to Muting users`,
                                value: `admin-muted`
                            },

                            {
                                label: `Kick and Ban`,
                                description: `Commands related to Kicking and Banning users`,
                                value: `admin-banned`
                            },

                            {
                                label: `Others`,
                                description: `Other commands for managing roles, nicknames, channels`,
                                value: `admin-others`
                            }
                        ])
                )

            message.channel.send({ embeds: [adminembed], components: [adminrow] }).then(msg => {
                Client.on(`interactionCreate`, async inter => {
                    if (!inter.isSelectMenu()) return
                    if (inter.user.id != message.author.id) {
                        return inter.reply({ content: `Type \`!help admin\` and check the commands for yourself`, ephemeral: true })
                    }

                    if (inter.customId == `admin-help`) {
                        if (inter.values == `admin-levels`) {
                            inter.deferUpdate()
                            const levelembed = new discord.MessageEmbed()
                                .setAuthor(`Founder Ymir`, Client.user.displayAvatarURL({ dynamic: true }))
                                .setColor(`AQUA`)
                                .setTitle(`Level`)
                                .setDescription(`This bot has a leveling system where it gives XP to users when they message. Once the users acquire required amount of XP, their level increases. At certain levels, certain roles will be assigned to them.\n\n **As an Admin/Mod you can manage the levels and XP of the users.**`)
                                .addFields(
                                    { name: `addlevel (Admins, Mods)(Slash Command)`, value: `Increases the mentioned user level by the amount specified.` },
                                    { name: `addxp (Admins, Mods)(Slash Command)`, value: `Adds specified amount of XP to the mentioned user.` },
                                    { name: `createuser (Admins)(Slash Command)`, value: `Creates a User entry in the database if the mentioned user doesn't had any User Level.` },
                                    { name: `deleteuser (Admins)(Slash Command)`, value: `Deletes the User entry of the user mentioned from the database.` },
                                    { name: `removelevel (Admins, Mods)(Slash Command)`, value: `Decreases the mentioned user level by the amount specified.` },
                                    { name: `removexp (Admins, Mods)(Slash Command)`, value: `Removes specified amount of XP from the mentioned user.` }
                                )
                            msg.edit({ embeds: [levelembed], components: [adminrow] })
                        }

                        if (inter.values == `admin-muted`) {
                            inter.deferUpdate()
                            const muteembed = new discord.MessageEmbed()
                                .setAuthor(`Founder Ymir`, Client.user.displayAvatarURL({ dynamic: true }))
                                .setColor(`GREYPLE`)
                                .setTitle(`Mute`)
                                .setDescription(`Incase you find a User breaking rules, mute them from messaging.`)
                                .addFields(
                                    { name: `mute (Admins, Mods)(Slash Command)`, value: `Mutes the mentioned user from messaging.` },
                                )
                            msg.edit({ embeds: [muteembed], components: [adminrow] })
                        }

                        if (inter.values == `admin-banned`) {
                            inter.deferUpdate()
                            const kickembed = new discord.MessageEmbed()
                                .setAuthor(`Founder Ymir`, Client.user.displayAvatarURL({ dynamic: true }))
                                .setColor(`NAVY`)
                                .setTitle(`Kick and Ban`)
                                .setDescription(`Incase you find a User breaking rules, you can Kick or Softban(remove all their roles) then from the server.`)
                                .addFields(
                                    { name: `kick (Admins, Mods)(Slash Command)`, value: `Kicks the mentioned user from the server.` },
                                    { name: `ban (Admins)(slash Command)`, value: `Bans the mentioned user from the server.` },
                                    { name: `unban (Admins)(Slash Command)`, value: `Unbans the mentioned user in the server.` }
                                    
                                )
                            msg.edit({ embeds: [kickembed], components: [adminrow] })
                        }


                        if (inter.values == `admin-others`) {
                            inter.deferUpdate()
                            const otherembed = new discord.MessageEmbed()
                                .setAuthor(`Founder Ymir`, Client.user.displayAvatarURL({ dynamic: true }))
                                .setColor(`ORANGE`)
                                .setTitle(`Other`)
                                .setDescription(`Other Moderation commands for managing messages, roles, channels.`)
                                .addFields(
                                    { name: `addrole (Admins, Mods)(Slash Command)`, value: `Add a specified role to the mentioned user.` },
                                    { name: `purge (Admins, Mods)(Slash Command)`, value: `Delete specified amount of messages in a channel.` },
                                    { name: `nickname (Admins, Mods)(Slash Command)`, value: `Change the nickname of a mentioned user to a specified nickname.` },
                                    { name: `nuke (Owner)(Slash Command)`, value: `Nuke a channel to remove all the messages in it.` },
                                    { name: `removerole (Admins, Mods)(Slash Command)`, value: `Remove a specified role from the mentioned user.` }
                                )
                            msg.edit({ embeds: [otherembed], components: [adminrow] })
                        }
                    }
                })
            })
            message.delete()
        } else {
            const normalembed = new discord.MessageEmbed()
                .setAuthor(`Founder Ymir`, Client.user.displayAvatarURL({ dynamic: true }))
                .setTitle(`Help Section of Founder Ymir Bot`)
                .setColor(`RANDOM`)
                .setDescription(`***Kon'nichiwa ${message.author.username}***\n**Welcome to the Help Section.**\n**My prefix**: \`!\`\n\n_See the list of Available commands you can use by selecting the category below_.\n\n__To see the commands available to use for Moderation, type \`!help admin\`(Only Admins and Mods can use that Command)__\n\nTo get more info about a command, type \`!help <command name>\`\n\n_To get Complete info about me, select **About Me** at the last in the menu_\n\n_Note_: When you use a command of the bot, don't delete your message, bot will automatically delete it.`)
                .setFooter(`Developed by Levi Ackerman#8058`, creator.user.displayAvatarURL({ dynamic: true }))
            const normalrow = new discord.MessageActionRow()
                .addComponents(
                    new discord.MessageSelectMenu()
                        .setCustomId(`normal-menu`)
                        .setPlaceholder(`Choose a category to check commands`)
                        .addOptions([
                            {
                                label: `Level`,
                                description: `Commands Related to user levels`,
                                value: `level`
                            },

                            {
                                label: `Fun Images`,
                                description: `Commands Related to funny images`,
                                value: `fun-images`
                            },

                            {
                                label: `Fun`,
                                description: `Commands for fun`,
                                value: `fun`
                            },

                            {
                                label: `Games`,
                                description: `Commands related to games`,
                                value: `games`
                            },

                            {
                                label: `Utility`,
                                description: `Commands for Utility purposes`,
                                value: `utility`
                            },

                            {
                                label: `About Me`,
                                description: `Complete information about me`,
                                value: `me`
                            }
                        ])
                )

            message.channel.send({ embeds: [normalembed], components: [normalrow] }).then(msg => {
                Client.on(`interactionCreate`, async inter => {
                    if (!inter.isSelectMenu()) return
                    if (inter.user.id != message.author.id) {
                        return inter.reply({ content: `Type \`!help\` and check the commands for yourself`, ephemeral: true })
                    }
                    if (inter.customId == `normal-menu`) {
                        if (inter.values == `level`) {
                            inter.deferUpdate()
                            const levelembed = new discord.MessageEmbed()
                                .setAuthor(`Founder Ymir`, Client.user.displayAvatarURL({ dynamic: true }))
                                .setColor(`AQUA`)
                                .setTitle(`Level`)
                                .setDescription(`This bot has a leveling system where it gives XP to users when they message. Once the users acquire required amount of XP, their level increases. At certain levels, certain roles will be assigned to them.`)
                                .addFields(
                                    { name: `!rank`, value: `Sends a RankCard of the mentioned user Rank and Level.` },
                                    { name: `!leaderboard`, value: `Shows the leaderboard of the Top users in this server according to their Rank.` }
                                )
                            msg.edit({ embeds: [levelembed], components: [normalrow] })
                        }

                        if (inter.values == `fun-images`) {
                            inter.deferUpdate()
                            const imageembed = new discord.MessageEmbed()
                                .setAuthor(`Founder Ymir`, Client.user.displayAvatarURL({ dynamic: true }))
                                .setColor(`GREYPLE`)
                                .setTitle(`Fun Images`)
                                .setDescription(`Fun commands to generate Funny images based on the arguments you provide.`)
                                .addFields(
                                    { name: `!affect`, value: `See how people got affected by the user you mentioned.` },
                                    { name: `!beautiful`, value: `See whether the user you mentioned or you are beautiful.` },
                                    { name: `!bed`, value: `See the user you mentioned under your bed.` },
                                    { name: `!changemeymind`, value: `Ask people whether they can change your mind.` },
                                    { name: `!clyde`, value: `See the text you said from clyde bot.` },
                                    { name: `!facepalm`, value: `Virtually do a facepalm.` },
                                    { name: `!fuse`, value: `See the user you mentioned getting fused with you.` },
                                    { name: `!greyscale`, value: `See everything in grey.` },
                                    { name: `!worse`, value: `See whether the user you mentioned are the worse.` },
                                    { name: `!jail`, value: `See the user you mentioned or yourself in jail.` },
                                    { name: `!negative`, value: `See something in negative.` },
                                    { name: `!trigger`, value: `Feeling triggered? Show it to people.` },
                                    { name: `!wanted`, value: `No description for this :)` }
                                )
                            msg.edit({ embeds: [imageembed], components: [normalrow] })
                        }

                        if (inter.values == `fun`) {
                            inter.deferUpdate()
                            const funembed = new discord.MessageEmbed()
                                .setAuthor(`Founder Ymir`, Client.user.displayAvatarURL({ dynamic: true }))
                                .setColor(`NAVY`)
                                .setTitle(`Fun`)
                                .setDescription(`Fun commands to do Funny things based on the arguments you provide.`)
                                .addFields(
                                    { name: `!8ball`, value: `Ask a Yes or No question to the bot and see its response.` },
                                    { name: `!clap`, value: `Convert your text into claps.` },
                                    { name: `!doot`, value: `Convert your text into doot.` },
                                    { name: `!emojify`, value: `Convert your text into emojis.` },
                                    { name: `!hug`, value: `Virtually Hug someone.` },
                                    { name: `!kiss`, value: `Virtually Kiss Someone.` },
                                    { name: `!ship`, value: `Ship yourself with someone.` }
                                )
                            msg.edit({ embeds: [funembed], components: [normalrow] })
                        }

                        if (inter.values == `games`) {
                            inter.deferUpdate()
                            const gameembed = new discord.MessageEmbed()
                                .setAuthor(`Founder Ymir`, Client.user.displayAvatarURL({ dynamic: true }))
                                .setColor(`ORANGE`)
                                .setTitle(`Games`)
                                .setDescription(`Game commands to play games with the bot and users you mention.`)
                                .addFields(
                                    { name: `!blackjack`, value: `Play Blackjack game with the bot.` },
                                    { name: `!fasttype`, value: `Type the word the bot sends before others does.` },
                                    { name: `!hangman`, value: `Guess the correct word based on the hint before you hang the person.` },
                                    { name: `!rps`, value: `Play Rock Paper Scissors with the Bot.` },
                                    { name: `!snake`, value: `Play the Classic snake game.` },
                                    { name: `!tictactoe`, value: `Play TicTacToe with the user you mention.` }
                                )
                            msg.edit({ embeds: [gameembed], components: [normalrow] })
                        }

                        if (inter.values == `utility`) {
                            inter.deferUpdate()
                            const utilityembed = new discord.MessageEmbed()
                                .setAuthor(`Founder Ymir`, Client.user.displayAvatarURL({ dynamic: true }))
                                .setColor(`LIGHT_GREY`)
                                .setTitle(`Utility`)
                                .setDescription(`Utility commands to for useful purposes.`)
                                .addFields(
                                    { name: `!afk`, value: `Set yourself AFK with a reason.` },
                                    { name: `!anime`, value: `Get info about the Anime you provide to the bot.` },
                                    { name: `!avatar`, value: `Get the avatar of yours or the avatar of the user you mention.` },
                                    { name: `!help`, value: `See the available commands of the bot you can use.` },
                                    { name: `!manga`, value: `Get info about the Manga you provide to the bot.` },
                                    { name: `!ping`, value: `Ping the bot to check its latency.` },
                                    { name: `!report`, value: `Report a user to the mods if they does something wrong.` },
                                    { name: `!user`, value: `Get comeplete info about yourself or the user you mention.` },
                                    { name: `!warnings`, value: `Check how many warnings you have.` }
                                )
                            msg.edit({ embeds: [utilityembed], components: [normalrow] })
                        }

                        if (inter.values == `me`) {
                            inter.deferUpdate()
                            const meembed = new discord.MessageEmbed()
                                .setAuthor(`Founder Ymir`, Client.user.displayAvatarURL({ dynamic: true }))
                                .setThumbnail(Client.user.displayAvatarURL({ dynamic: true }))
                                .setTitle(`About Me`)
                                .setDescription(`**HEY THERE!**\n\nI am **Founder Ymir**\n__I am a Server Manager bot__\n\n_I was developed to manage the server **This is AOT**_\nI do Server Moderation with _Leveling System_,_Anti Spam and Raid_,_Invite Logging_,_Ghost Ping logging_, and many more...\n\nI was developed by **Levi Ackerman#8058**\nConsider buying him a [Tea](https://www.buymeacoffee.com/levida) :D`)
                                .setFooter(`Developed by Levi Ackerman#8058`, creator.user.displayAvatarURL({ dynamic: true }))

                            msg.edit({ embeds: [meembed], components: [normalrow] })
                        }
                    }

                })
            })



            message.delete()

        }

    } catch (error) {
        console.log(error)
        errorlog(error, message, `help`)
    }




}

module.exports.help = {
    name: `help`,
    aliases: []
}
