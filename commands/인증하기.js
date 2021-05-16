const { Message } = require('discord.js')

module.exports = {
    name : '인증하기',
    run : async(client, message, args) => {
        //lets use parameters (optional)
        /**
         * @param {Message} message
         */
        //so firstly we will check whether the author of the message has permissions
        //this line means if the author doesn't have manage roles permission it will stop the process and send the following text
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('너는 권한이 없어.')
        //next we define some variables
        const target = message.mentions.members.first() //member = mentions
        if(!target) return message.channel.send('누구를 인증 시킬건지') //when no member is pinged
        let role = message.guild.roles.cache.find(r=> r.name === "인증된맴버")
        //now the code!
        await target.roles.add(role) // adding the role to the user
        message.channel.send(`${target.user.username}님을 인증시켰어요!`)
    }
}