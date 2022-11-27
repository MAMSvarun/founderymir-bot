const discord = require('discord.js')
const blackjack = require('discord-blackjack')

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return

    message.delete()

    let gameembed = new discord.MessageEmbed()
        .setAuthor(`${message.author.username}'s Blackjack Game`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor('#00ecde')
        .addFields(
            { name: `${message.author.username} (Player)`, value: `Cards: {yourcontent}\nTotal: \`{yvalue}\`` },
            { name: `${Client.user.username} (dealer)`, value: `Cards: {dcontent}\nTotal: \`{dvalue}\`` }
        )

    let game = await blackjack(message, discord, { split: false, doubledown: false, normalEmbed: false, resultEmbed: false, normalEmbedContent: gameembed })

    switch (game.result) {
        case "Win":
            message.channel.send({
                embeds: [new discord.MessageEmbed()
                    .setAuthor(`${message.author.username}'s Blackjack Game`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle(`You WON :) ${game.method}`)
                    .setColor('#07ec00')
                    .addFields(
                        { name: `${message.author.username} (Player)`, value: `Cards: ${game.ycontent}\nTotal: \`${game.yvalue}\`` },
                        { name: `${Client.user.username} (dealer)`, value: `Cards: ${game.dcontent}\nTotal: \`${game.dvalue}\`` }
                    )
                ]
            })

            break;

        case "Lose":
            message.channel.send({
                embeds: [new discord.MessageEmbed()
                    .setAuthor(`${message.author.username}'s Blackjack Game`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle(`You Lost :( ${game.method}`)
                    .setColor('RED')
                    .addFields(
                        { name: `${message.author.username} (Player)`, value: `Cards: ${game.ycontent}\nTotal: \`${game.yvalue}\`` },
                        { name: `${Client.user.username} (dealer)`, value: `Cards: ${game.dcontent}\nTotal: \`${game.dvalue}\`` }
                    )
                ]
            })

            break;

        case 'Tie':
            message.channel.send({
                embeds: [new discord.MessageEmbed()
                    .setAuthor(`${message.author.username}'s Blackjack Game`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle(`You Tied. ${game.method}`)
                    .setColor('YELLOW')
                    .addFields(
                        { name: `${message.author.username} (Player)`, value: `Cards: ${game.ycontent}\nTotal: \`${game.yvalue}\`` },
                        { name: `${Client.user.username} (dealer)`, value: `Cards: ${game.dcontent}\nTotal: \`${game.dvalue}\`` }
                    )
                ]
            })

        case 'Timeout':
            message.channel.send({
                embeds: [new discord.MessageEmbed()
                    .setAuthor(`${message.author.username}'s Blackjack Game`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle(`TIMEOUT`)
                    .setColor('YELLOW')
                    .setDescription(`You didn't responded till 30 seconds. So Game Ended`)
                    .setFooter(`Atleast give a response next time.`)
                ]
            })

            break;

        case 'Cancel':
            message.channel.send({
                embeds: [new discord.MessageEmbed()
                    .setAuthor(`${message.author.username}'s Blackjack Game`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle(`Cancelled...`)
                    .setColor('RED')
                    .setDescription(`You cancelled the game, hope you will play again.`)
                ]
            })
    }
}

module.exports.help = {
    name: 'blackjack',
    aliases: ['bj']
}
