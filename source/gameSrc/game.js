import { dealCards,choosingDealer,forceBets,fiveRounds } from "./gameLogic.js";
import { players } from "./Players&Cards/players.js";
import { determinePlayerHand } from "./playersHands.js";


function initGame(){
    let counter = 0;
    players.forEach(player => {
        if(player.money <= 0){
            player.isFold = true
            removePlayerIcons(player.name)
            counter++
        }
    })
    if(counter === 4){
        console.log(players);
        alert("WINNER")
    }
    choosingDealer()
    dealCards()
    forceBets()
    fiveRounds()
}

function removePlayerIcons(name){
    document.querySelector(`main #${name}Icon`).style.opacity = "0"
}

export {initGame}