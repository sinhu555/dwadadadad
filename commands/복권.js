const discord = require('discord.js')
module.exports = {
    name: "복권",
    description: "play a game of rock, paper and scissors",
    run: async(client, message, args) => {
        let embed = new discord.MessageEmbed()
        .setTitle("복권 게임")
        .setDescription("복권 놀이! 이것은 복권을  놀이 입니다. (가위바위보기능을 이용한겁니다. 가위바위보기능이랑 동일합니다.)")
        .setTimestamp()
        let msg = await message.channel.send(embed)
        await msg.react("💵")
        await msg.react("🚔")
        await msg.react("💳")

        const filter = (reaction, user) => {
            return ['💵', '🚔', '💳'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = ['💵', '🚔', '💳']
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions(filter, {max:1, time: 60000, error: ["time"]}).then(
            async(collected) => {
                const reaction = collected.first()
                let result = new discord.MessageEmbed()
                .setTitle("결과")
                .addField("당신의 선택", `${reaction.emoji.name}`)
                .addField("내 선택", `${me}`)
            await msg.edit(result)
                if ((me === "💵" && reaction.emoji.name === "🚔") ||
                (me === "💳" && reaction.emoji.name === "💵") ||
                (me === "🚔" && reaction.emoji.name === "💳")) {
                    message.reply("복권 날라가셨네요 ㅋㅋ");
            } else if (me === reaction.emoji.name) {
                return message.reply("네 복권 날리셨네요 ㅋㅋ");
            } else {
                return message.reply("님이 이겨서 복권을 가지셨어요");
            }
        })
        .catch(collected => {
                message.reply('제 시간에 응답하지 않았으므로 처리가 취소되었습니다!');
            })
}
}