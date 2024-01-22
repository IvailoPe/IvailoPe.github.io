import { players } from "./Players&Cards/players.js";
import { cards, resetCards } from "./Players&Cards/gameCards.js";
import { updateGameLogs } from "./gameLogs.js";
import { preFlop, FlopTurnRiver } from "./gameRounds.js";
import { initGame } from "./game.js";
import { determinePlayerHand } from "./playersHands.js";

/*setInterval(() => {
  console.clear();
  console.log(players);
  console.log(cards);
  console.log(communityCards);
}, 15000)*/

let communityCards = [
  /* {
     card:5,
     color:"H5-5"
   },
   {
     card:2,
     color:"S2-2"
   },
   {
     card:9,
     color:"C9-9"
   },
   {
     card:6,
     color:"H6-6"
   },
   {
     card:2,
     color:"S2-2"
   },*/
]

let indexFromDealer

let pot = 0;

function dealCards() {
  for (let player of players) {
    if (player.isFold === true) {
      continue
    }
    let indexOfCard = Math.floor(Math.random() * 12)
    let indexOfSuit = Math.floor(Math.random() * 4)

    while (cards[indexOfCard].name.length === 0) {
      indexOfCard = Math.floor(Math.random() * 12)
    }

    while (cards[indexOfCard].name[indexOfSuit] === undefined) {
      indexOfSuit = Math.floor(Math.random() * 4)
    }

    player.card1Name = cards[indexOfCard].name[indexOfSuit]
    player.card1Power = cards[indexOfCard].card

    cards[indexOfCard].name.splice(indexOfSuit, 1)

    indexOfCard = Math.floor(Math.random() * 12)
    indexOfSuit = Math.floor(Math.random() * 4)

    while (cards[indexOfCard].name.length === 0) {
      indexOfCard = Math.floor(Math.random() * 12)
    }

    while (cards[indexOfCard].name[indexOfSuit] === undefined) {
      console.log(cards[indexOfCard].name[indexOfSuit]);
      indexOfSuit = Math.floor(Math.random() * 4)
    }

    player.card2Name = cards[indexOfCard].name[indexOfSuit]
    player.card2Power = cards[indexOfCard].card

    cards[indexOfCard].name.splice(indexOfSuit, 1)

    let isUser = player.name === "user" ? true : false;

    if (isUser) {
      document.querySelector(`#${player.name}F`).src = `../pictures/cards/${player.card1Name}.png`
      document.querySelector(`#${player.name}S`).src = `../pictures/cards/${player.card2Name}.png`
      document.querySelector(`#${player.name}F`).style.opacity = "1"
      document.querySelector(`#${player.name}S`).style.opacity = "1"
    }
    else {
      document.querySelector(`#${player.name}F`).src = `../pictures/cards/${player.card1Name}.png`
      document.querySelector(`#${player.name}S`).src = `../pictures/cards/${player.card2Name}.png`
      document.querySelector(`#${player.name}F`).style.opacity = "1"
      document.querySelector(`#${player.name}S`).style.opacity = "1"
    }
    updateGameLogs(`Giving cards to ${player.name}`)
  }
}

function choosingDealer() {
  let dealer = Math.floor(Math.random() * 5)

  while (players[dealer].isFold === true) {
    dealer = Math.floor(Math.random() * 5)
  }

  indexFromDealer = dealer + 1

  if (indexFromDealer == players.length) {
    indexFromDealer = 0;
  }

  while (players[indexFromDealer].isFold === true) {
    indexFromDealer++;
    if (indexFromDealer >= players.length) {
      indexFromDealer = 0;
    }
  }

  players[dealer].isDealer = true;
  updateGameLogs(`The dealer is ${players[dealer].name}`)
}

function forceBets() {
  if (players[indexFromDealer].money <= 10) {
    players[indexFromDealer].isAllIn = true;
    players[indexFromDealer].allInFromStart = true;
    players[indexFromDealer].money = 0
    //pot += 10;
  }
  else {
    //pot += 10;
    players[indexFromDealer].money -= 10
  }

  document.querySelector(`main #${players[indexFromDealer].name}BetIcon`).style.opacity = "1"
  document.querySelector(`main #${players[indexFromDealer].name}BetSize`).textContent = 10
  players[indexFromDealer].action = `Call 10`

  updateGameLogs(`${players[indexFromDealer].name} forcefully bets 10`)
  indexFromDealer++

  if (indexFromDealer == players.length) {
    indexFromDealer = 0;
  }

  while (players[indexFromDealer].isFold === true) {
    indexFromDealer++;
    if (indexFromDealer >= players.length) {
      indexFromDealer = 0;
    }
  }

  if (players[indexFromDealer].money <= 15) {
    players[indexFromDealer].isAllIn = true;
    players[indexFromDealer].allInFromStart = true;
    players[indexFromDealer].money = 0
    // pot += 15;
  }
  else {
    // pot += 15;
    players[indexFromDealer].money -= 15
  }

  document.querySelector(`main #${players[indexFromDealer].name}BetIcon`).style.opacity = "1"
  document.querySelector(`main #${players[indexFromDealer].name}BetSize`).textContent = 15
  players[indexFromDealer].action = `Call 15`
  updateGameLogs(`${players[indexFromDealer].name} forcefully bets 15`)
}

let foldCounter = 0

let shouldDebbug = false

async function fiveRounds() {
  console.log("ROUND 1");
  foldCounter = await preFlop(foldCounter)
  debugger
  collectBets()
  console.log(pot);
  debugger
  if (pot + players.reduce((acumulator, currentValue) => {
    return acumulator + +currentValue.money
  }, 0) !== 5000) {
    debugger
  }
  if (foldCounter < 4 || foldCounter === undefined) {
    foldCounter = 0
    console.log("ROUND 2");
    document.querySelector("#communityCards").style.opacity = "1"
    clearPlayersAction()
    dealCommunityCards("Flop")
    foldCounter = await FlopTurnRiver(foldCounter, shouldDebbug)
    debugger
    collectBets()
    console.log(pot);
    debugger
    if (pot + players.reduce((acumulator, currentValue) => {
      return acumulator + +currentValue.money
    }, 0) !== 5000) {
      debugger
    }
    if (foldCounter < 4 || foldCounter === undefined) {
      foldCounter = 0
      console.log("ROUND 3");
      clearPlayersAction()
      dealCommunityCards("Turn")
      foldCounter = await FlopTurnRiver(foldCounter, shouldDebbug)
      debugger
      collectBets()
      console.log(pot);
      debugger
      if (pot + players.reduce((acumulator, currentValue) => {
        return acumulator + +currentValue.money
      }, 0) !== 5000) {
        debugger
      }
      if (foldCounter < 4 || foldCounter === undefined) {
        console.log("ROUND 4");
        clearPlayersAction()
        dealCommunityCards("River")
        foldCounter = await FlopTurnRiver(foldCounter, shouldDebbug)
        debugger
        collectBets()
        console.log(pot);
        debugger
        if (pot + players.reduce((acumulator, currentValue) => {
          return acumulator + +currentValue.money
        }, 0) !== 5000) {
          debugger
        }
      }
    }
  }
  debugger
  if (pot + players.reduce((acumulator, currentValue) => {
    return acumulator + +currentValue.money
  }, 0) !== 5000) {
    debugger
  }

  let winnerWinners
  debugger
  if (foldCounter === 4) {
    //debugger
    winnerWinners = [players.find(player => !player.isFold)]
  }
  else {
    winnerWinners = checkWhoWins()
  }

  if (winnerWinners.length === 1) {
    winnerWinners[0].money += pot
  }
  else {
    let splitAmount = parseInt(pot / winnerWinners.length)   //parseInt(pot / winnerWinners.length)
    for (let index = 0; index < winnerWinners.length; index++) {
      winnerWinners[index].money += splitAmount
    }
  }
  debugger
  pot = 0;
  console.log(winnerWinners);
  console.log(players);
  if (pot + players.reduce((acumulator, currentValue) => {
    return acumulator + +currentValue.money
  }, 0) !== 5000) {
    debugger
  }
  debugger
  clearCards()
  resetState()
  initGame()
}

function clearCards() {
  communityCards.length = 0;
  players.forEach(player => {
    player.card1Name = null;
    player.card2Name = null;
    player.card1Power = null;
    player.card2Power = null;
    player.hand = null;
    player.action = "  "
  })
}

function resetState() {
  players.forEach(player => {
    if (player.allInFromStart) {
      delete player.allInFromStart
    }
    player.isAllIn = false;
    player.isFold = false;
    player.isDealer = false;
    document.querySelector(`main #${player.name}F`).src = ""
    document.querySelector(`main #${player.name}S`).src = ""
    document.querySelector(`main #${player.name}Icon`).style.opacity = "0.3"
    document.querySelector(`main #${player.name}BetIcon`).style.opacity = "0"
    document.querySelector("main #pot-container").style.opacity = "0"
    document.querySelector("main #pot-container #pot").textContent = ""
    document.querySelector("main #communityCards").style.opacity = "0"
    document.querySelectorAll("main #communityCards img").forEach(card => {
      card.src = ""
    })
    document.querySelector(`main #${player.name}BetSize`).textContent = ""
    document.querySelector("main #logs").innerHTML = ""
  })
  pot = 0;
  resetCards()
}

function clearPlayersAction() {
  players.forEach(player => {
    player.action = "  "
  })
}

function collectBets() {
  let betsRef = Array.from(document.querySelectorAll("main > p"))
  let potRef = document.querySelector("#pot-container")

  betsRef.forEach((bet) => {
    if (bet.textContent) {
      pot += +bet.textContent
    }
    bet.textContent = ""
    document.querySelector(`#${bet.id.split("Size")[0]}Icon`).style.opacity = "0"
  })
  potRef.style.opacity = "1"
  potRef.querySelector("#pot").textContent = pot
}

function dealCommunityCards(round) {
  let i;
  let index
  if (round === "Flop") {
    index = 0
    i = 3;
  }
  else if (round === "Turn") {
    index = 3
    i = 4;
  }
  else if (round === "River") {
    index = 4
    i = 5;
  }

  for (; index < i; index++) {
    let indexOfCard = Math.floor(Math.random() * 12)
    let indexOfSuit = Math.floor(Math.random() * 4)

    while (cards[indexOfCard].name.length === 0) {
      indexOfCard = Math.floor(Math.random() * 12)
    }

    while (cards[indexOfCard].name[indexOfSuit] === undefined) {
      indexOfSuit = Math.floor(Math.random() * 4)
    }
    communityCards.push(
      {
        card: cards[indexOfCard].card,
        color: cards[indexOfCard].name[indexOfSuit]
      }
    )
    document.querySelector("#communityCards").querySelectorAll("img")[index].src = `./pictures/cards/${cards[indexOfCard].name[indexOfSuit]}.png`
    cards[indexOfCard].name.splice(indexOfSuit, 1)
  }
}

function checkWhoWins() {
  let buff
  let winner

  players.forEach(player => {
    if (player.allInFromStart) {
      debugger
      player.hand = determinePlayerHand(player.card1Power, player.card1Name, player.card2Power, player.card2Name)
    }
  })

  let remainingPlayers = players.filter(player => {
    if (player.isFold === false) {
      return true
    }
  })
  console.log(remainingPlayers);
  remainingPlayers
    .sort((a, b) => {
      return a.hand.power - b.hand.power
    })
  let highestPower = remainingPlayers[0].hand.power
  remainingPlayers = remainingPlayers.filter(player => {
    if (player.hand.power === highestPower) {
      return true;
    }
  })
  if (remainingPlayers.length === 1) {
    winner = remainingPlayers[0]
  }
  else {
    if (remainingPlayers[0].hand.name === "Royal Flush") {
    }
    else {
      buff = [...remainingPlayers]
      remainingPlayers.sort((a, b) => {
        for (let index = 0; index < 5; index++) {
          if (+b.hand.cards[index].split(/\D/)[1] > +a.hand.cards[index].split(/\D/)[1]) {
            return 1
          }
          else if (+b.hand.cards[index].split(/\D/)[1] < +a.hand.cards[index].split(/\D/)[1]) {
            return -1
          }
        }
        return 0
      })
      let firstValue = remainingPlayers[0].hand.cards.join("").split(/\D/).join("")
      remainingPlayers = remainingPlayers.filter(player => {
        if (player.hand.cards.join("").split(/\D/).join("") === firstValue) {
          return true
        }
      })
    }
  }
  return remainingPlayers
}


export { dealCards, choosingDealer, forceBets, communityCards, fiveRounds,clearCards,resetState }