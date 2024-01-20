import { players } from "./Players&Cards/players.js"
import { playerAction } from "./playerAction.js"
import { determinePlayerHand } from "./playersHands.js";

let highestBet = 15;
let counter

async function preFlop(foldCounter) {
    counter = 0
    let findIndexOfDealer = players.indexOf(players.find((player) => player.isDealer)) + 3
    if (findIndexOfDealer >= players.length) {
        findIndexOfDealer = findIndexOfDealer - players.length
    }

    let i = findIndexOfDealer;
    while (true) {
        if(players[i].isFold || players[i].isAllIn){
            counter++;
            if(counter === 5){
                break;
            }
            i++;
            if (i === players.length) {
                i = 0;
            }
            continue
        }
        counter = 0;
        if (+document.querySelector(`main #${players[i].name}BetSize`).textContent !== highestBet && players[i].money !== 0) {
            players[i].hand = determinePlayerHand(players[i].card1Power, players[i].card1Name, players[i].card2Power, players[i].card2Name)
            players[i].action = playerAction(players[i].hand, false, highestBet, players[i].money)
            console.log(`ACTION: ${players[i].action} MONEY:${players[i].money} NAME:${players[i].name}`);

            if(players[i].action.split(" ")[0] === "Fold"){
                players[i].isFold = true;
            }
            if(players[i].action.split(" ")[0] === "AllIn"){
                debugger
                players[i].isAllIn = true;
                players[i].money = 0;
                highestBet = +players[i].action.split(" ")[1] + +document.querySelector(`main #${players[i].name}BetSize`).textContent
            }
            if (players[i].action.split(" ")[0] === "Raise") {
                debugger
                players[i].money = players[i].money - (+players[i].action.split(" ")[1] - +document.querySelector(`main #${players[i].name}BetSize`).textContent)
                highestBet = +players[i].action.split(" ")[1]
                players[i].action = `Raise ${+players[i].action.split(" ")[1] - +document.querySelector(`main #${players[i].name}BetSize`).textContent}`
            }
            if(players[i].action.split(" ")[0] === "Call"){
                debugger
                if(+players[i].action.split(" ")[1] + +document.querySelector(`main #${players[i].name}BetSize`).textContent > highestBet){
                    players[i].action = `Call ${highestBet - +document.querySelector(`main #${players[i].name}BetSize`).textContent}`
                }
                players[i].money = players[i].money - +players[i].action.split(" ")[1]
                if(players[i].money <= 0){
                    players[i].isAllIn = true;
                    players[i].action = `AllIn ${players[i].action.split(" ")[1]}`
                }
            }

            if(!players[i].isFold){
                players.forEach((player,index) => {
                    if(index !== i && player.isFold === false){
                        document.querySelector(`main #${player.name}Icon`).style.opacity = "0.3"
                    }
                })
                document.querySelector(`main #${players[i].name}Icon`).style.opacity = "1"
                document.querySelector(`main #${players[i].name}BetIcon`).style.opacity = "1" 
                document.querySelector(`main #${players[i].name}BetSize`).textContent = +players[i].action.split(" ")[1] + +document.querySelector(`main #${players[i].name}BetSize`).textContent

            }
            else{
                document.querySelector(`main #${players[i].name}Icon`).style.opacity = "0"
    
                document.querySelector(`main #${players[i].name}F`).style.opacity = "0" 
                document.querySelector(`main #${players[i].name}S`).style.opacity = "0" 
               // document.querySelector(`main #${players[i].name}BetIcon`).style.opacity = "0" 
               // document.querySelector(`main #${players[i].name}BetSize`).textContent = ""
            }
            console.log(`---ACTION: ${players[i].action} MONEY:${players[i].money} NAME:${players[i].name}---`);
            await new Promise(resolve => {
                setTimeout(() => {
                    resolve()
                },1300)
            })
            foldCounter = 0
            players.forEach(player => {
                if(player.isFold === true){
                    foldCounter++
                }
            })
            if(foldCounter === 4){
                return foldCounter
            }
        }
        else{
            /*players.forEach(player => {
                if (player.card1Name && player.hand === null) {
                  debugger
                }
              })*/
            break;
        }
        i++;
        if (i === players.length) {
            i = 0;
            continue
        }
    }
}

async function FlopTurnRiver(foldCounter,shouldDebbug){
    if(shouldDebbug){
        debugger
    }
    highestBet = 15
    let indexOfDealer = players.indexOf(players.find((player) => player.isDealer)) + 1
    let activePlayer
    counter = 0;
    let checkedPlayers = 0
    let canCheck = true
    while(!activePlayer){
        if(indexOfDealer === players.length){
            indexOfDealer = 0;
        }
        if(players[indexOfDealer].isFold === false){
            activePlayer = indexOfDealer
            break
        }
        indexOfDealer++;
        counter++;
        if(counter === 5){
            break;
        }
    }
    let i = indexOfDealer
    counter = 0;
    while (true) {
        if(players[i].isFold || players[i].isAllIn){
            counter++;
            if(counter === 5){
                players.forEach(player => {
                    if(player.card1Name && player.hand === null){
            
                    }
                })
                break;
            }
            i++;
            if (i === players.length) {
                i = 0;
            }
            continue
        }
        counter = 0
        if (+document.querySelector(`main #${players[i].name}BetSize`).textContent !== highestBet && players[i].money !== 0) {   //OT TULA
            players[i].hand = determinePlayerHand(players[i].card1Power, players[i].card1Name, players[i].card2Power, players[i].card2Name)
            players[i].action = playerAction(players[i].hand, canCheck, highestBet, players[i].money)
            if(players[i].action.split(" ")[0] === "Raise" && +players[i].action.split(" ")[1] > players[i].money){
                players[i].action = `Check ${highestBet}`
            }
            console.log(`ACTION: ${players[i].action} MONEY:${players[i].money} NAME:${players[i].name}`);
            if(players[i].action.split(" ")[0] === "Check"){
                if(checkedPlayers !== -1){
                checkedPlayers++;
                }
                if(checkedPlayers === 5 ){
                  break;  
                }
            }
            if(players[i].action.split(" ")[0] === "Fold"){
                players[i].isFold = true;
            }
            if(players[i].action.split(" ")[0] === "AllIn"){
                canCheck = false
                checkedPlayers = -1
                players[i].isAllIn = true;
                players[i].money = 0;
                highestBet = +players[i].action.split(" ")[1] + +document.querySelector(`main #${players[i].name}BetSize`).textContent
            }
            if (players[i].action.split(" ")[0] === "Raise") {
                canCheck = false
                checkedPlayers = -1
                players[i].money = players[i].money - (+players[i].action.split(" ")[1] - +document.querySelector(`main #${players[i].name}BetSize`).textContent)
                highestBet = +players[i].action.split(" ")[1]
                players[i].action = `Raise ${+players[i].action.split(" ")[1] - +document.querySelector(`main #${players[i].name}BetSize`).textContent}`
            }
            if(players[i].action.split(" ")[0] === "Call"){
                if(+players[i].action.split(" ")[1] + +document.querySelector(`main #${players[i].name}BetSize`).textContent > highestBet){
                    players[i].action = `Call ${highestBet - +document.querySelector(`main #${players[i].name}BetSize`).textContent}`
                }
                canCheck = false
                checkedPlayers = -1
                players[i].money = players[i].money - +players[i].action.split(" ")[1]
                if(players[i].money <= 0){
                    players[i].isAllIn = true;
                    players[i].action = `AllIn ${players[i].action.split(" ")[1]}`
                }
            }
            //DO TUKA
            //TESTA
            if(!players[i].isFold){
                players.forEach((player,index) => {
                    if(index !== i && player.isFold === false){
                        document.querySelector(`main #${player.name}Icon`).style.opacity = "0.3"
                    }
                })
                document.querySelector(`main #${players[i].name}Icon`).style.opacity = "1"
                document.querySelector(`main #${players[i].name}BetIcon`).style.opacity = "1" 
                document.querySelector(`main #${players[i].name}BetSize`).textContent = +players[i].action.split(" ")[1] + +document.querySelector(`main #${players[i].name}BetSize`).textContent
            }
            else{
                document.querySelector(`main #${players[i].name}Icon`).style.opacity = "0"

                document.querySelector(`main #${players[i].name}F`).style.opacity = "0" 
                document.querySelector(`main #${players[i].name}S`).style.opacity = "0" 
              //  document.querySelector(`main #${players[i].name}BetIcon`).style.opacity = "0" 
              //  document.querySelector(`main #${players[i].name}BetSize`).textContent = ""
            }
            console.log(`${players[i].name} *has* ${players[i].money} *action* ${players[i].action} *cards* ${players[i].hand.cards}`);
            await new Promise(resolve => {
                setTimeout(() => {
                    resolve()
                },1300)
            })
            foldCounter = 0
            players.forEach(player => {
                if(player.isFold === true){
                    foldCounter++
                }
            })
            if(foldCounter === 4){
                return foldCounter
            }
            //TESTA
        }
        else{
            break;
        }
        i++;
        if (i === players.length) {
            i = 0;
            continue
        }
    }
}

export { preFlop,FlopTurnRiver }