async function createCmd(Client, guildId) {

    const data = [

        //8ball
        {
            name: `8ball`,
            description: `Ask the bot a question `,
            options: [
                {
                    name: `question`,
                    type: `STRING`,
                    description: `Your question`,
                    required: true
                }
            ]
        },

        //addlevel
        {
            name: `addlevel`,
            description: `Increases the level of the user by a specified amount`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to increase their level`,
                    required: true
                },

                {
                    name: `amount`,
                    type: `NUMBER`,
                    description: `Specify the number of levels to increase`,
                    required: true
                }
            ]
        },


        //addrole
        {
            name: `addrole`,
            description: `Add a specified role to a User`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to add role to them`,
                    required: true
                },

                {
                    name: `role`,
                    type: `ROLE`,
                    description: `Mention a role to add it to the user`,
                    required: true
                }
            ]
        },


        //addxp
        {
            name: `addxp`,
            description: `Add specified amount of XP to a user`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to add Xp to them`,
                    required: true
                },

                {
                    name: `amount`,
                    type: `NUMBER`,
                    description: `Specify the amount of XP to add`,
                    required: true
                }
            ]
        },


        //afk
        {
            name: `afk`,
            description: `Set yourself AFK`,
            options: [
                {
                    name: `reason`,
                    type: `STRING`,
                    description: `Reason for going AFK`
                }
            ]
        },


        //angry
        {
            name: `angry`,
            description: `Chill out dude, don't be angry`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention the user who made you angry`
                }
            ]
        },


        //anime
        {
            name: `anime`,
            description: `Search for an anime`,
            options: [
                {
                    name: `name`,
                    type: `STRING`,
                    description: `Name of the anime`,
                    required: true
                }
            ]
        },


        //ban
        {
            name: `ban`,
            description: `Bans the user`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `User whom you want to ban`,
                    required: true
                },

                {
                    name: `soft`,
                    type: `STRING`,
                    description: `Choose whether you want to softban`,
                    choices: [
                        { name: `Yes`, value: `Yes` },
                        { name: `No`, value: `No` }
                    ],
                    required: true
                },

                {
                    name: `reason`,
                    type: `STRING`,
                    description: `Reason to ban the user`,
                    required: true
                }
            ]
        },


        //clap
        {
            name: `clap`,
            description: `Send a text and receive it as claps`,
            options: [
                {
                    name: `text`,
                    type: `STRING`,
                    description: `Your Text`,
                    requred: true
                }
            ]
        },



        //claps
        {
            name: `claps`,
            description: `Yeah, someone deserves an applause`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to clap for them`
                }
            ]
        },


        //createUser
        {
            name: `createuser`,
            description: `Create a level file incase a user doesn't have any levels`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to create a level file for them`,
                    required: true
                }
            ]
        },


        //cry
        {
            name: `cry`,
            description: `Poor creature ;-;`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention the user who made you cry`
                }
            ]
        },


        //dance
        {
            name: `dance`,
            description: `Dance off bro`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to dance with them`
                }
            ]
        },


        //deleteUser
        {
            name: `deleteuser`,
            description: `Delete the level file of a user`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to delete their level file`,
                    required: true
                }
            ]
        },


        //disgusted
        {
            name: `disgusted`,
            description: `Bruh...duh...uhhh`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention the user who made you feel disgusted `
                }
            ]
        },


        //doot
        {
            name: `doot`,
            description: `Send a text and it receive it as doots`,
            options: [
                {
                    name: `text`,
                    type: `STRING`,
                    description: `Your Text`,
                    required: true
                }
            ]
        },


        //hug
        {
            name: `hug`,
            description: `Hug someone`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to hug them`
                }
            ]
        },



        //kick
        {
            name: `kick`,
            description: `Kicks a user from the server`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to kick them from the server`,
                    required: true
                },

                {
                    name: `reason`,
                    type: `STRING`,
                    description: `Reason to kick them from the server`,
                    required: true
                }
            ]
        },


        //kiss
        {
            name: `kiss`,
            description: `Ooo..feeling love huh?`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to kiss them`
                }
            ]
        },


        //kill
        {
            name: `kill`,
            description: `Atleast fulfill the last wish of that person`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to kill them`
                }
            ]
        },


        //laugh
        {
            name: `laugh`,
            description: `Laugh Out Loud`
        },


        //leaderboard
        {
            name: `leaderboard`,
            description: `Top 15 users of the server`
        },


        //manga
        {
            name: `manga`,
            description: `Search for a Manga`,
            options: [
                {
                    name: `name`,
                    type: `STRING`,
                    description: `Name of the manga`,
                    required: true
                }
            ]
        },

        //mute
        {
            name: `mute`,
            description: `Mutes the mentioned user`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to mute them`,
                    required: true
                },

                {
                    name: `reason`,
                    type: `STRING`,
                    description: `Reason to mute the user`,
                    required: true
                }
            ]
        },



        //nuke
        {
            name: `nuke`,
            description: `Deletes all the messages in the channel`
        },



        //punch
        {
            name: `punch`,
            description: `Are you Saitama?`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to punch them`
                }
            ]
        },



        //purge
        {
            name: `purge`,
            description: `Deletes specified number of messages`,
            options: [
                {
                    name: `amount`,
                    type: `NUMBER`,
                    description: `Specify the number of messages to be deleted`
                }
            ]
        },


        //rank
        {
            name: `rank`,
            description: `Get a Rank card`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to get their rank card`
                }
            ]

        },


        //removelevel
        {
            name: `removelevel`,
            description: `Decreases the level of the user by a specified amount`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to decrease their level`,
                    required: true
                },

                {
                    name: `amount`,
                    type: `NUMBER`,
                    description: `Specify the number of levels to decrease`,
                    required: true
                }
            ]
        },


        //removerole
        {
            name: `removerole`,
            description: `Remove a specified role from a user`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to remove role from them`,
                    required: true
                },

                {
                    name: `role`,
                    type: `ROLE`,
                    description: `Mention a role to remove it from the user`,
                    required: true
                }
            ]
        },


        //removexp
        {
            name: `removexp`,
            description: `Remove specified amount of XP from a user`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to remove Xp to them`,
                    required: true
                },

                {
                    name: `amount`,
                    type: `NUMBER`,
                    description: `Specify the amount of XP to remove`,
                    required: true
                }
            ]
        },


        //report
        {
            name: `report`,
            description: `Report a User(report will be sent to the server admins)`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to report them`,
                    required: true
                },

                {
                    name: `reason`,
                    type: `STRING`,
                    description: `Reason for reporting them`,
                    required: true
                }
            ]
        },


        //sad
        {
            name: `sad`,
            description: `Don't feel sad boi`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention the user who made you feel sad`
                }
            ]
        },


        //ship
        {
            name: `ship`,
            description: `Ship yourself or someone else with someone`,
            options: [
                {
                    name: `user1`,
                    type: `USER`,
                    description: `Mention a user to ship them`,
                    required: true
                },

                {
                    name: `user2`,
                    type: `USER`,
                    description: `Mention a user to ship them with the previous user(leave empty to select random user)`
                }
            ]
        },


        //shocked
        {
            name: `shocked`,
            description: `What!!!?`
        },


        //smirk
        {
            name: `smirk`,
            description: `Oooo..`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to smirk at them`
                }
            ]
        },


        //tense
        {
            name: `tense`,
            description: `Feeling tensed huh?`
        },



        //unban
        {
            name: `unban`,
            description: `Unbans the user`,
            options: [
                {
                    name: `user-id`,
                    type: `STRING`,
                    description: `User ID of the user whom you want to unban`,
                    required: true
                },

                {
                    name: `soft`,
                    type: `STRING`,
                    description: `Choose whether you want to remove the softban from the user`,
                    choices: [
                        { name: `Yes`, value: `Yes` },
                        { name: `No`, value: `No` }
                    ],
                    required: true
                }
            ]
        },

        //unmute
        {
            name: `unmute`,
            description: `Unmutes the mentioned user`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to unmute them`,
                    required: true
                },

                {
                    name: `reason`,
                    type: `STRING`,
                    description: `Reason to unmute the user`
                }
            ]

        },


        //user
        {
            name: `userprofile`,
            description: `See details of a user`,
            options: [
                {
                    name: `user`,
                    type: `USER`,
                    description: `Mention a user to get their details`,
                    required: true
                }
            ]

        }

    ]

    await Client.guilds.cache.get(guildId)?.commands.set(data)
}

module.exports = { createCmd }
