const discord = require('discord.js')
const { get } = require("request-promise-native")
const wait = require(`node:timers/promises`).setTimeout;

module.exports.run = async (Client, interaction, slasherrorlog) => {


    try {

        const animename = interaction.options.getString(`name`)

        let option = {
            url: `https://kitsu.io/api/edge/anime?filter[text]=${animename}`,
            method: 'GET',
            headers: {
                'Content-type': "application/vnd.api+json",
                'Accept': "application/vnd.api+json",
            },
            json: true
        }


        get(option).then(async mat => {

            await interaction.deferReply()
            await wait(2000)


            if (!mat.data[0]) {

                return await interaction.editReply({ content: '**No Anime found.**', ephemeral: true })

            } else {

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

                return await interaction.editReply({ embeds: [embed] })

            }

        })

    } catch (err) {
        console.log(err)
        slasherrorlog(err, interaction, 'anime')
    }

}


module.exports.help = {
    name: 'anime'
}