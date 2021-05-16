const covid19 = require('covid19-korea')
const { MessageEmbed } = require('discord.js')
module.exports = {
    async run (client, message, args) {
        if(args == '도움') {
            return message.channel.send(`\`\`\`\n가능한 지역군\n\n1. 서울\n2. 부산\n3. 대구\n4. 인천\n5. 광주\n6. 대전\n7. 울산\n8. 세종\n9. 경기\n10. 강원\n11. 충북\n12. 충남\n13. 전남\n14.경북\n15. 경남\n16. 제주\n\`\`\``)
        }
        let corona = await covid19.getTotal(`${args}`).catch(e => message.channel.send(`\`\`\`에러 발생!\n\n에러: ${e}\n\`\`\``))
        let em = new MessageEmbed()
        em.setTitle(`코로나 확진자 현황`)
        em.setColor('GREEN')
        em.addField('확진자', corona[0].confirm + "명")
        em.addField('완치', corona[0].cure + "명")
        em.addField('치료중', corona[0].curing +"명")
        em.addField('사망', corona[0].dead + "명")
        em.setFooter(args)
        message.channel.send(em)
    },
    name: 'covid',
    description: 'show covid in korea',
}