module.exports = {
    name: "주사위",
    execute(message,args){
        if(isNaN(args[0])) return message.reply("올바른 값을 입력해주세요.");
        const bettingMoney = parseInt(args[0]);
        if(bettingMoney < 500) return message.reply("500 이상의 돈만 배팅할 수 있습니다.");
        
        const fs = require('fs')
        const id = message.author.id;
        const name = message.author.username;
        const filePath = `./data/${id}.json`;
        let saveUser = {};
        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const today = new Date();
        const date = "" + today.getFullYear() + today.getMonth() + today.getDate();
        if(bettingMoney > user.money) return message.reply("가지고 있는 돈보다 많은 금액은 배팅할 수 없습니다.") // 플레이어가 소유한 돈보다 많은 금액은 배팅 불가
        const playerDice1 = Math.floor(Math.random() * 6 + 1); // 플레이어의 주사위 1
        const playerDice2 = Math.floor(Math.random() * 6 + 1); // 플레이어의 주사위 2
        const botDice1 = Math.floor(Math.random() * 6 + 1); // 봇의 주사위 1
        const botDice2 = Math.floor(Math.random() * 6 + 1); // 봇의 주사위 2

        message.reply(`너는 주사위를 굴려 ${Math.floor(playerDice1)} 와 ${Math.floor(playerDice2)} 가 나왔어!`); // 플레이어의 주사위 결과 출력
        setTimeout(()=>{message.reply(`너의 상대는 주사위를 굴려 ${Math.floor(botDice1)} 와 ${Math.floor(botDice2)} 가 나왔어!`);},2000) // 봇의 주사위 결과 출력
        setTimeout(()=>{if(Math.floor(playerDice1 + playerDice2) > Math.floor(botDice1 + botDice2)){
            message.reply(`너가 이겼어! 배팅한 금액의 두배를 줄게!\n **+ ${Math.floor(bettingMoney * 2)}**`);
            saveUser = {
                id,
                name,
                date,
                money : user.money + bettingMoney,
              }
            fs.writeFileSync(filePath, JSON.stringify(saveUser));
        };
        if(Math.floor(playerDice1 + playerDice2) == Math.floor(botDice1 + botDice2)){
            message.reply(`비겼어! 배팅한 금액의 50%는 돌려줄게!\n **- ${Math.floor(bettingMoney / 2)}**`);
            saveUser = {
                id,
                name,
                date,
                money : user.money - bettingMoney / 2,
              }
            fs.writeFileSync(filePath, JSON.stringify(saveUser));
        };
        if(Math.floor(playerDice1 + playerDice2) < Math.floor(botDice1 + botDice2)){
            message.reply(`너가 졌어! 배팅한 금액을 잃었어!\n **- ${Math.floor(bettingMoney)}**`);
            saveUser = {
                id,
                name,
                date,
                money : user.money - bettingMoney,
              }
            fs.writeFileSync(filePath, JSON.stringify(saveUser));
        };
        },4000) // 주사위 도박 결과 출력
    }
}