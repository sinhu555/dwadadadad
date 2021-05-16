const math = require('mathjs');

const Discord = require('discord.js');

module.exports = {
    name: "계산",
    description: "수학 문제의 정답을 알려줍니다",


    async run (client, message, args){

        if(!args[0]) return message.channel.send('문제를 입력해주세요!');

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('올바른 **값**을 입력해주세요.')
        }

        const embed = new Discord.MessageEmbed()
        .setColor(0x808080)
        .setTitle('계산기')
        .addField('문제', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('정답', `\`\`\`css\n${resp}\`\`\``)

        message.channel.send(embed);

    }
}