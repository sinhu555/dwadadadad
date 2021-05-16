const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "serverinfo",
        aliases: ["si", "server"],
        description: "serverinfo"
    },
    run: async (bot, message, args) => {
        let embed = new MessageEmbed()
            .setColor(bot.colours.cyan)
            .setTitle("Server Info")
            .setThumbnail(message.guild.iconURL)
            .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
            .addField("**Guild Name:**", `${message.guild.name}`, true)
            .addField("**Guild Owner:**", `${message.guild.owner}`, true)
            .addField("**Member Count:**", `${message.guild.memberCount}`, true)
            .addField("**Role Count:**", `${message.guild.roles.size}`, true)
            // .setFooter(`TestBot | Footer`, bot.user.displayAvatarURL);
        message.channel.send(embed);
    }
}