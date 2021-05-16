const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "실검",
  category: "info",
  description: "Get the youngest account creation date in the guild!",
  run: async (bot, message, args) => {
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('네이버 실검')
            .setURL('https://datalab.naver.com/')
            .setDescription('제목을 클릭하면 네이버 실검을 볼수있습니다.')

            message.channel.send(embed);
        }
    }
    