module.exports = {
    name: "슬로우모드",
    description: "Set the slowmode of a channel.",
    aliases: ["슬로우"],
    run: async(client, message, args) => {
        if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("권한 없으면 가라"); //MANAGE_MESSAGES라고 써있는거 지우지마시고 놨두세요
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            return message.reply("권한 없으면 가라")
        }
        let duration = args[0]
        if(isNaN(duration)) return message.reply("슬로우 모드를 몇초로 할건지 시간을 적으세요")
        let reason = args.slice(1).join(" ")
        if(!reason) return message.reply("이유를 지정하세요")
        
        message.channel.setRateLimitPerUser(duration, reason)
        message.reply(`이유-${reason}을 사용하여 슬로우 모드를 ${duration} 초로 성공적으로 설정했습니다.`)
    }
}