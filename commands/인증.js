const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
  name: "μΈμ¦",
  run: async (client, message, args) => {
    let verifirole = message.guild.roles.cache.find(r=> r.name === "π¬ : λ©€λ²")
    let noverifirole = message.guild.roles.cache.find(r=> r.name === "μΈμ¦λκΈ°")
    message.member.roles.add(verifirole);
    message.member.roles.remove(noverifirole);
    let embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setDescription(`${message.author.username}λ μΈμ¦ μλ£ λμμ΅λλ€.`)
    .setTimestamp()
    message.channel.send(embed)
  }
}