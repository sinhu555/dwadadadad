const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
  name: "인증",
  run: async (client, message, args) => {
    let verifirole = message.guild.roles.cache.find(r=> r.name === "💬 : 멤버")
    let noverifirole = message.guild.roles.cache.find(r=> r.name === "인증대기")
    message.member.roles.add(verifirole);
    message.member.roles.remove(noverifirole);
    let embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setDescription(`${message.author.username}님 인증 완료 되었습니다.`)
    .setTimestamp()
    message.channel.send(embed)
  }
}