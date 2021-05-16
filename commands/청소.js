module.exports = {
    config: {
        name: "clear",
        description: "청소",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("관리자 권한이 필요합니다.");
        const amount = parseInt(args[0]) || 1;
        message.channel.bulkDelete(amount + 1, true);
        message.channel.send(`${amount}개의 메세지를 삭제했습니다.`).then((msg) => msg.delete({timeout: 3000}))
    }
}