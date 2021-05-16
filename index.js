const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');

const { readdirSync } = require('fs');
const { join } = require('path');

client.commands = new Discord.Collection();

const prefix = '!' //자신의 프리픽스

client.queue = new Map()

const commandFile = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith("js"));
// 커맨드 파일 불러오는 구문들
for (const file of commandFile) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
  let commands = file.split(".")[0];
  console.log('Loading Commands: ' + commands)
}

client.on("error", console.error);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity("PLAYERUNKNOWN'S BATTLEGROUNDS", {
    type: "STREAMING", //LISTENING 듣기 | WATCHING 시청중 | STREAMING 방송중 | GAME 하는중
    url: "https://www.twitch.tv/si2sipol" //type 이 STREAMING 일때 아래 보기 버튼이 추가됨
  });
});

client.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  if(message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;

    try {
      client.commands.get(command).run(client, message, args);
    } catch (error) {
      console.error(error);
    }
  }
})

client.on('guildMemberAdd',member=>{
  client.channels.cache.get('832955176431124530').send(`<@${member.user.id}>님이 본 서버에 입장하셨습니다`)
})

client.on('guildMemberRemove',member=>{
  client.channels.cache.get('832955228743139337').send(`<@${member.user.id}>님이 본 서버에서 나가셨습니다.`)
})

client.on('message', async message => {
  const args = message.content.substring(prefix.length).split(' ')


  if(message.content.startsWith(`${prefix}투표`)) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('관리자 권한을 가진 사람만 이 명령어를 실행 할 수 있습니다')

    const vote = args.slice(1).join(' ')

    const regex = vote.match(/"[^"]+"|[\\S]+"[^"]+/g)

    if(regex.length > 10) {
      return message.channel.send('최대 9개까지만 투표 할 수 있습니다')
    }

    let str = ''
    
    let emoji = [
      '1️⃣',
      '2️⃣',
      '3️⃣',
      '4️⃣',
      '5️⃣',
      '6️⃣',
      '7️⃣',
      '8️⃣',
      '9️⃣'
    ]

    let i = 0

    for (const poll of regex) {
      str = str + `${emoji[i]} ${poll}\n\n`
      i++
    }

    const a = new Discord.MessageEmbed()
    .setDescription(str.replace(/"/g, ''))

    const msg = await message.channel.send(a)

    for (let i = 0; i < regex.length; i++) {
      msg.react(emoji[i])
    }

    message.delete();
  }
})

client.on('message', message =>{
  if(message.content == `!달리기`) {
    const number = [
    `당신의봇이 달리기 배틀에서 이겼습니다.`,
    `당신의봇이 달리기 배틀에서 졌습니다.`,
    `${message.author.tag}님이 이기셨습니다.`,
    `${message.author.tag}님이 지셨습니다.`,

  ];
  
  const Response = Math.floor(Math.random() * number.length);
  
  message.channel.send(`${number[Response]}`)
  }
  })

  client.on('message', message =>{
    if(message.content == `!수영`) {
      const number = [
      `당신의봇이 수영 배틀에서 이겼습니다.`,
      `당신의봇이 수영 배틀에서 졌습니다.`,
      `${message.author.tag}님이 수영 배틀에서 이기셨습니다.`,
      `${message.author.tag}님이 수영 배틀에서 지셨습니다.`,
  
    ];
    
    const Response = Math.floor(Math.random() * number.length);
    
    message.channel.send(`${number[Response]}`)
    }
    })

client.login(token);