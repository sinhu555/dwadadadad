const { MessageEmbed } = require('discord.js')
const os = require('os')

module.exports = {
    name: "bot-info",
    category: "bot",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('Bot Stats')
            .setColor('#000000')
            .addFields(
                {
                    name: ':globe_with_meridians: 서버',
                    value: `당신의 봇은 ${client.guilds.cache.size}개의 서버에 있습니다.`,
                },
                {
                    name: ':tv: 채널',
                    value: `${client.channels.cache.size} 채널`,
                },
                {
                    name: ':busts_in_silhouette: 서버 사용자',
                    value: `${client.users.cache.size}`,
                },
                {
                    name: ':hourglass_flowing_sand: 핑',
                    value: `${Math.round(client.ws.ping)}ms`,
                },
                {
                    name: '가입 날짜',
                    value: client.user.createdAt,
                },
                {
                    name: '서버 정보',
                    value: `코어: ${os.cpus().length}`,
                }
            )

        await message.channel.send(embed)
    }
}