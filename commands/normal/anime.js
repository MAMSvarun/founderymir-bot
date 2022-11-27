const discord = require('discord.js')
const { get } = require("request-promise-native")

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return

    let animename = args.slice(0).join(' ')
    if (message.mentions.users.first() || message.mentions.roles.first()) return message.reply({ content: `**You need to type an Anime name, don't mention users or roles.**` }).then(msg => {
        setTimeout(() => {
            msg.delete()
            message.delete()
        }, 5000);
    })
    if (!animename) return message.reply({ content: '**Please provide an Anime name.**' }).then(msg => {
        setTimeout(() => {
            msg.delete()
            message.delete()
        }, 5000);
    })
    try {

        let option = {
            url: `https://kitsu.io/api/edge/anime?filter[text]=${animename}`,
            method: 'GET',
            headers: {
                'Content-type': "application/vnd.api+json",
                'Accept': "application/vnd.api+json",
            },
            json: true
        }
        message.channel.send({ content: "Fetching for your Anime..." }).then(msg => {
            get(option).then(mat => {

                if (!mat.data[0]) return msg.delete().then(message.reply({ content: '**Unable to find the Anime.**' })).then(msg => {
                    setTimeout(() => {
                        msg.delete()
                        message.delete()
                    }, 5000);
                })

                const embed = new discord.MessageEmbed()
                    .setTitle(`${mat.data[0].attributes.titles.en_jp}`)
                    .setURL(`https://kitsu.io/anime/${mat.data[0].id}`)
                    .setTimestamp()
                    .setThumbnail(`${mat.data[0].attributes.posterImage.original}`)
                    .setImage(`https://media.kitsu.io/anime/cover_images/${mat.data[0].id}/large.jpg`)
                    .setDescription(`${mat.data[0].attributes.synopsis}`)
                    .setColor('RANDOM')
                    .addFields(
                        { name: ':dividers:Type', value: `${mat.data[0].attributes.showType}`, inline: true },
                        { name: ':calendar_spiral:Aired', value: `from **${mat.data[0].attributes.startDate}** to **${mat.data[0].attributes.endDate ? mat.data[0].attributes.endDate : "N/A"}**` },
                        { name: ':hourglass_flowing_sand:Status', value: `${mat.data[0].attributes.status}`, inline: true },
                        { name: 'Next Release', value: `**${mat.data[0].attributes.nextRelease ? mat.data[0].attributes.nextRelease : "N/A"}**`, inline: true },
                        { name: ':minidisc:Episodes', value: `${mat.data[0].attributes.episodeCount ? mat.data[0].attributes.episodeCount : "N/A"}`, inline: true },
                        { name: ':stopwatch:Duration', value: `${mat.data[0].attributes.episodeLength ? mat.data[0].attributes.episodeLength : "N/A"}min Each`, inline: true },
                        { name: ':star:Rating Rank', value: `**${mat.data[0].attributes.ratingRank}**`, inline: true },
                        { name: ':heart:Popularity Rank', value: `**TOP ${mat.data[0].attributes.popularityRank}**`, inline: true },
                        { name: ':star:Average Rating', value: `**TOP ${mat.data[0].attributes.averageRating}**`, inline: true },
                        { name: ':bust_in_silhouette:Age Rating', value: `**${mat.data[0].attributes.ageRating}-${mat.data[0].attributes.ageRatingGuide}**`, inline: true }
                    )
                message.channel.send({ embeds: [embed] })
                msg.delete()
                message.delete()

            })
        })

    } catch (err) {
        console.log(err)
        errorlog(err, message, 'anime')
    }

}


module.exports.help = {
    name: 'anime',
    aliases: []
}