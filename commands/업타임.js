const Discord = require("discord.js");

module.exports = {
  name: '업타임',
  category: 'info',
  description: 'ping',
  run: async(bot,message,args)=>{
  
  let totalSeconds = bot.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let uptime = ` ${days.toFixed()} 일\n ${hours.toFixed()} 시간\n ${minutes.toFixed()} 분\n ${seconds.toFixed()} 초`;

  const embed = new Discord.MessageEmbed()
    .setTitle(`업타임`)
    .setColor("BLUE")
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription(`**나는 온라인에 있었다:**\n${uptime}`)

  message.channel.send(embed);
}
}