function playerAction(playerHand, check, highestBet, playerMoney) {
  let canCheck = true
  if (check === false) {
    canCheck = false;
  }

  let decision
  let money = 0;

  if (playerHand.name === "High Card" || playerHand.name === "Pair") {
    if (playerHand.name === "High Card") {
      let cardPower = playerHand.cards[0].split(/\D/)[1]

      if (highestBet >= playerMoney) {
        decision = Math.floor(Math.random() * cardPower) <= 6 ? "Fold" : "AllIn"
        money = playerMoney
        return `${decision} ${money}`
      }

      if (cardPower >= 13) {
        decision = Math.floor(Math.random() * 10) <= 7 ? "Call" : "Raise"
        if (decision === "Call") {
          money = highestBet
        }
        else {
          money = Math.floor(Math.random() * (highestBet * 1.3 - highestBet) + highestBet)
        }
      }
      else if (cardPower <= 8) {
        if (cardPower <= 3 && canCheck) {
          decision = "Check"
          money = 0;
        }
        else {
          decision = Math.floor(Math.random() * 10) <= 6 ? "Call" : "Fold"
          if (decision === "Call") {
            money = highestBet
          }
          else {
            money = "FOLD"
          }
        }
      }
      else {
        decision = Math.floor(Math.random() * 10) <= 8 ? "Call" : "Fold"
        if (decision === "Call") {
          money = highestBet
        }
        else {
          money = "FOLD"
        }
      }
    }
    else {
      let cardPower = playerHand.cards[0].split(/\D/)[1]
      if (highestBet >= playerMoney) {
        decision = Math.floor(Math.random() * cardPower) <= 4 ? "Fold" : "AllIn"
        if (decision === "AllIn") {
          money = playerMoney
        }
        else {
          money = "FOLD"
        }
        return `${decision} ${money}`
      }

      if (cardPower >= 7) {
        if (cardPower >= 13) {
          decision = Math.floor(Math.random() * 7) === 6 ? "AllIn" : "Raise"
          if (decision === "AllIn") {
            money = playerMoney
          }
          else {
            money = Math.floor(Math.random() * (highestBet * 1.3 - highestBet) + highestBet)
          }
        }
        else {
          decision = Math.floor(Math.random() * 10) <= 8 ? "Call" : "Raise"
          if (decision === "Call") {
            money = highestBet
          }
          else {
            money = Math.floor(Math.random() * (highestBet * 1.3 - highestBet) + highestBet)
          }
        }
      }
      else if (cardPower <= 4) {
        if (cardPower === 2 && canCheck) {
          decision = "Check"
          money = 0
        }
        else {
          decision = Math.floor(Math.random() * 10) <= 6 ? "Call" : "Fold"
          if (decision === "Call") {
            money = highestBet
          }
          else {
            money = "FOLD"
          }
        }
      }
      else {
        decision = Math.floor(Math.random() * 10) <= 8 ? "Call" : "Fold"
        if (decision === "Call") {
          money = highestBet
        }
        else {
          money = "FOLD"
        }
      }
    }
  }
  else {
    let num
    decision = "Call"
    money = highestBet
    let cardP
    switch (playerHand.name) {
      case "Royal Flush":
        decision = "AllIn"
        money = playerMoney
        break;

      case "Straight Flush":
        decision = "AllIn"
        money = playerMoney
        break;

      case "Four of a Kind":
        decision = "AllIn"
        money = playerMoney
        break;

      case "Full House":
        num = Math.floor(Math.random() * 5)
        if (highestBet >= playerMoney) {
          decision = Math.floor(Math.random() * 7) <= 1 ? "Fold" : "AllIn"
          if (decision === "AllIn") {
            money = playerMoney
          }
          else {
            money = "FOLD"
          }
          return `${decision} ${money}`
        }

        if (num === 4) {
          decision = "AllIn"
          money = playerMoney
        }
        else if (num === 3) {
          decision = "Raise"
          money = Math.floor(Math.random() * (highestBet * 1.3 - highestBet) + highestBet)
        }
        else {
          decision = "Call"
          money = highestBet;
        }
        break;

      case "Flush":
        num = Math.floor(Math.random() * 6)

        if (highestBet >= playerMoney) {
          decision = Math.floor(Math.random() * 7) <= 1 ? "Fold" : "AllIn"
          if (decision === "AllIn") {
            money = playerMoney
          }
          else {
            money = "FOLD"
          }
          return `${decision} ${money}`
        }

        if (num === 5) {
          decision = "AllIn"
          money = playerMoney
        }
        else if (num === 4) {
          decision = "Raise"
          money = Math.floor(Math.random() * (highestBet * 1.3 - highestBet) + highestBet)
        }
        else {
          decision = "Call"
          money = highestBet;
        }
        break;

      case "Straight":
        num = Math.floor(Math.random() * 7)
        cardP = playerHand.cards[4].split(/\D/)[1]
        if (highestBet >= playerMoney) {
          decision = Math.floor(Math.random() * cardP) <= 2 ? "Fold" : "AllIn"
          if (decision === "AllIn") {
            money = playerMoney
          }
          else {
            money = "FOLD"
          }
          return `${decision} ${money}`
        }

        if (num === 6) {
          decision = "AllIn"
          money = playerMoney
        }
        else if (num === 5) {
          decision = "Raise"
          money = Math.floor(Math.random() * (highestBet * 1.3 - highestBet) + highestBet)
        }
        else {
          decision = "Call"
          money = highestBet;
        }
        break;

      case "Three of a Kind":
        let cardPower = playerHand.cards[0].split(/\D/)[1]

        if (highestBet >= playerMoney) {
          decision = Math.floor(Math.random() * cardPower) <= 2 ? "Fold" : "AllIn"
          if (decision === "AllIn") {
            money = playerMoney
          }
          else {
            money = "FOLD"
          }
          return `${decision} ${money}`
        }

        if (cardPower >= 12) {
          decision = Math.floor(Math.random() * 7) === 7 ? "AllIn" : "Raise"
          if(decision === "AllIn"){
            money = playerMoney
          }
          else{
            money = Math.floor(Math.random() * (highestBet * 1.3 - highestBet) + highestBet)
          }
        }
        else if (cardPower >= 7) {
          decision = Math.floor(Math.random() * 7) > 4 ? "Raise" : "Check"
          if(decision === "Raise"){
            money = Math.floor(Math.random() * (highestBet * 1.3 - highestBet) + highestBet)
          }
          else{
            money = highestBet
          }
        }
        else if (cardPower >= 4) {
          decision = "Call"
          money = highestBet;
        }
        else {
          decision = Math.floor(Math.random() * 4) === 3 ? "Fold" : "Call"
          if (decision === "Call") {
            money = highestBet
          }
          else {
            money = "FOLD"
          }
        }
        break;
      case "Two Pair":
        cardP = playerHand.cards[0].split(/\D/)[1]
        if (highestBet >= playerMoney) {
          decision = Math.floor(Math.random() * cardP) <= 2 ? "Fold" : "AllIn"
          if (decision === "AllIn") {
            money = playerMoney
          }
          else {
            money = "FOLD"
          }
          return `${decision} ${money}`
        }
        if (cardP >= 12) {
          decision = Math.floor(Math.random() * 10) <= 8 ? "Raise" : "AllIn"
          if (decision === "Raise") {
            money = Math.floor(Math.random() * (highestBet * 1.3 - highestBet) + highestBet)
          }
          else {
            money = playerMoney
          }
        }
        else if (cardP >= 7) {
          decision = Math.floor(Math.random() * 10) <= 9 ? "Call" : "Raise"
          if (decision === "Raise") {
            money = Math.floor(Math.random() * (highestBet * 1.3 - highestBet) + highestBet)
          }
          else {
            money = highestBet
          }
        }
        else {
          decision = Math.floor(Math.random() * 10) <= 8 ? "Call" : "Fold"
          if (decision === "Call") {
            money = highestBet
          }
          else {
            money = "FOLD"
          }
        }
        break;
    }
  }
  return `${decision} ${money}`
}


/*
{
    power: 1,
    name: hands[0],
    cards: [cardsCopy[lengthOfCards - 5], cardsCopy[lengthOfCards - 4], cardsCopy[lengthOfCards - 3], cardsCopy[lengthOfCards - 2], cardsCopy[lengthOfCards - 1]]
}
*/

export { playerAction }