const discord = require('discord.js')
const { get } = require("request-promise-native")

module.exports.run = async (Client, message, args, prefix, errorlog) => {
    if (!message.content.startsWith(prefix)) return

    let animename = args.slice(0).join(' ')
    if (message.mentions.users.first() || message.mentions.roles.first()) return message.reply({ content: `**Type a Manga name, don't mention users or roles.**` })
    if (!animename) return message.reply({ content: '**Please provide a Manga name.**' })
    try {

        let option = {
            url: `https://kitsu.io/api/edge/manga?filter[text]=${animename}`,
            method: 'GET',
            headers: {
                'Content-type': "application/vnd.api+json",
                'Accept': "application/vnd.api+json",
            },
            json: true
        }
        message.channel.send("Fetching for your Manga...").then(msg => {
            get(option).then(mat => {

                if (!mat.data[0]) return msg.delete().then(message.reply({ content: '**Unable to find the Manga.**' }))

                const embed = new discord.MessageEmbed()
                    .setTitle(`${mat.data[0].attributes.titles.en_jp}`)
                    .setURL(`https://kitsu.io/manga/${mat.data[0].id}`)
                    .setTimestamp()
                    .setThumbnail(`${mat.data[0].attributes.posterImage.original}`)
                    .setImage(`https://media.kitsu.io/manga/cover_images/${mat.data[0].id}/large.jpg`)
                    .setDescription(`${mat.data[0].attributes.synopsis}`)
                    .setColor('RANDOM')
                    .addFields(
                        { name: ':dividers:Type', value: `${mat.data[0].type}`, inline: true },
                        { name: ':calendar_spiral:Published', value: `from **${mat.data[0].attributes.startDate}** to **${mat.data[0].attributes.endDate ? mat.data[0].attributes.endDate : "N/A"}**` },
                        { name: ':hourglass_flowing_sand:Status', value: `${mat.data[0].attributes.status}`, inline: true },
                        { name: 'Next Release', value: `${mat.data[0].attributes.nextRelease ? mat.data[0].attributes.nextRelease : "N/A"}`, inline: true },
                        { name: ':books:Volume Count', value: `${mat.data[0].attributes.volumeCount ? mat.data[0].attributes.volumeCount : "N/A"}`, inline: true },
                        { name: ':newspaper:Chapters', value: `${mat.data[0].attributes.chapterCount ? mat.data[0].attributes.chapterCount : "N/A"}`, inline: true },
                        { name: ':star:Rating Rank', value: `**${mat.data[0].attributes.ratingRank}**`, inline: true },
                        { name: ':heart:Popularity Rank', value: `**TOP ${mat.data[0].attributes.popularityRank}**`, inline: true },
                        { name: ':star:Average Rating', value: `**TOP ${mat.data[0].attributes.averageRating}**`, inline: true },
                        { name: ':bust_in_silhouette:Age Rating', value: `**${mat.data[0].attributes.ageRating}-${mat.data[0].attributes.ageRatingGuide}**`, inline: true }
                    )
                message.channel.send({ embeds: [embed] })
                msg.delete()

            })
        })

    } catch (err) {
        console.log(err)
        errorlog(err, message, 'manga')
    }

}


module.exports.help = {
    name: 'manga',
    aliases: []
}