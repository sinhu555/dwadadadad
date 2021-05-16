const ms = require("ms")
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'giveaway',
  description: '이벤트를 엽니다.',
  async run (client, message, args) {
    message.delete().then(async () => {

      const channel = message.client.channels.cache.get('834949968191422535') // 여기 설정한 채널로 이벤트가 끝났다는 메세지가 갈 것입니다.
  
      let time = args[0]
  
      const link = args[1]

      const needprize = args[2]
  
      const prize = args.slice(2).join(' ')
  
      const error = new MessageEmbed()
      .setTitle('오류 ❌')
      .setColor('dc2e44')

      if (!time) {

        error.setDescription(`이벤트가 진행될 기간을 입력해주세요!\n\n시간 포맷:\nm = 분\nh = 시\nd = 일`)
        message.channel.send(error)
        return

      } else if (!link) {

        error.setDescription(`상품 링크를 입력해주세요!\n예: https://discord.gift/YTcpJmRdzHnxhM4S`) // 혹시나 해서 적는건데 이 코드 쓴 코드입니다ㅎ
        message.channel.send(error)
        return

      } else if (!needprize) {

        error.setDescription(`상품 이름을 입력해주세요! (임베드에 표시될 이름)`)
        message.channel.send(error)
        return

      }
  
      if (!args[0].toLowerCase().endsWith("d")) {
        if (!args[0].toLowerCase().endsWith("h")) {
          if (!args[0].toLowerCase().endsWith("m")) {
            error.setDescription(`올바른 시간을 적어주세요!\n\n시간 :\nm = 분\nh = 시\nd = 일`)
            message.channel.send(error)
            return
          }
        }
      }
  
      if (prize.includes('https')) {
        error.setDescription('기간과 상품을 적는 곳엔 링크를 적을 수 없습니다!')
        return message.channel.send(error)
      }
  
      const embed = new MessageEmbed()
      .setTitle('Giveaway 이벤트')
      .setDescription(`🎉 이모지를 눌러 이벤트에 참가하세요!`)
      .setTimestamp()
      .addFields(
        {
          name: '상품',
          value: prize
        },
        {
          name: '당첨자 수',
          value: `1명`
        }
      )
      .setColor('FDFD96')
  
      if (args[0].toLowerCase().endsWith("d")) {
  
        const split1 = args[0].split('d')
        const timenumber1 = split1[0]
  
        if (isNaN(timenumber1)) {
          error.setDescription(`입력하신 시간은 숫자가 아닙니다!`)
          return message.channel.send(error)
        }
  
        embed.addFields(
          {
            name: '기간',
            value: `${timenumber1}일`
          }
        )
  
      } else if (args[0].toLowerCase().endsWith("h")) {
  
        const split2 = args[0].split('h')
        const timenumber2 = split2[0]
  
        if (isNaN(timenumber2)) {
          error.setDescription(`입력하신 시간은 숫자가 아닙니다!`)
          return message.channel.send(error)
        }
  
        embed.addFields(
          {
            name: '기간',
            value: `${timenumber2}시간`
          }
        )
  
      } else if (args[0].toLowerCase().endsWith("m")) {
  
        const split3 = args[0].split('m')
        const timenumber3 = split3[0]
  
        if (isNaN(timenumber3)) {
          error.setDescription(`입력하신 시간은 숫자가 아닙니다!`)
          return message.channel.send(error)
        }
  
        embed.addFields(
          {
            name: '기간',
            value: `${timenumber3}분`
          }
        )
      }
  
      message.channel.send(`<@&역할 ID>,`).then(async () => { // 저는 이벤트 열때마다 특정 역할을 멘션하는데, 필요 없으시면 빼셔도 됩니다!
        var before = await message.channel.send(embed) // 여기서부터 195번째 줄까진 완벽히 이해하신 분을 제외하곤 건드리지 마세요!
        before.react('🎉')
  
        setTimeout(async () => {
  
          const usersreacted = await before.reactions.cache.get('🎉').users.fetch()
          var peoplereacted = usersreacted.array().filter(u => u.id !== message.client.user.id)
      
          var winner
      
          if (peoplereacted.length <= 0) {
      
            error.setDescription(`아무도 이벤트에 참가하지 않았습니다.. :(`)
      
            return message.channel.send(error)
      
          } else {
            var random = Math.floor(Math.random() * peoplereacted.length)
            winner = peoplereacted[random]
          }
      
          if (!winner) {
      
            error.setDescription(`알 수 없는 오류가 발생하였습니다! 불편을 드려 죄송합니다.`)
      
            return message.channel.send(error)
          } else {
            const endedgw = new MessageEmbed()
            .setTitle('이벤트가 종료되었습니다!')
            .setColor('FDFD96')
            .addFields(
              {
                name: '상품',
                value: prize
              },
              {
                name: '당첨자',
                value: `${winner.toString()}`
              },
              {
                name: '상태',
                value: '종료됨'
              }
            )

            before.edit(endedgw)
            before.reactions.removeAll()
  
            const won = new MessageEmbed()
            .setTitle('축하합니다!! 🎉')
            .setDescription(`**Giveaway 이벤트**에서 당첨되셨습니다!\n[상품](${link})을 받아주세요!\n이 채널은 3일 후 자동으로 잠깁니다.\n유효기간이 지나기 전까지 상품을 받아가시기 바랍니다!`)
            .setColor('FDFD96')
  
            winner.send(won)
            channel.send(`<@!서버주인 ID>, 이벤트가 끝났습니다!`)
          }
        }, ms(time))
      })
    })
  }
}