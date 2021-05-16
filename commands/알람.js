module.exports = {
    name: '알람',
    description: '특정 시간 후 개인 메시지를 보냅니다.',
    execute(message, args) {
      let timeIndex = -1;
      for (let i = 0; i < args.length; i++) {
        let parsed = parseInt(args[i]);
        if (!isNaN(parsed)) {
          timeIndex = i;
          break;
        }
      }
  
      if (timeIndex === -1) {
        message.channel.send("시간을 입력하지 않은 것 같다");
        return;
      }
  
      let todo = args.slice(0, timeIndex).join(" ");
      let times = args.slice(timeIndex);
      
      let totalMilliseconds = 0;
      for (time of times) {
        if (time.includes("시간")) {
          totalMilliseconds += parseInt(time) * 1000 * 60 * 60;
        } else if (time.includes("분")) {
          totalMilliseconds += parseInt(time) * 1000 * 60;
        } else if (time.includes("초")) {
          totalMilliseconds += parseInt(time) * 1000;
        }
      }
      
      let futureMessage = "";
  
      let timeString = times.join(" ");
      if (todo.length) {
        message.channel.send(`${timeString} 후에 ${todo} 기억하겠다`);
        futureMessage = `${todo}의 시간이 되었다`;
      } else {
        message.channel.send(`${timeString} 후 알려주겠다`);
        futureMessage = `${timeString} 지났다`
      }
  
      setTimeout(() => {
        message.author.send(futureMessage);
        console.log(`[DONE] Sent message to ${message.author.tag} after ${totalMilliseconds}ms`);
      }, totalMilliseconds);
    },
  };