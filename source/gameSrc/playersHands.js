import { communityCards } from "./gameLogic.js";

let hands = [
    "Royal Flush",
    "Straight Flush",
    "Four of a Kind",
    "Full House",
    "Flush",
    "Straight",
    "Three of a Kind",
    "Two Pair",
    "Pair",
    "High Card",
]

function determinePlayerHand(card1Power, card1Name, card2Power, card2Name) {
        let isRoqyal
        let isSF
        let isFOAK
        let isFHouse
        let isFl
        let isStr
        let isTOAK
        let isTP
        let isP
        let isHC

        isRoqyal = isRoyal(communityCards, card1Name, card2Name)
        if (isRoqyal) {
            return isRoqyal
        }
        isSF = isStraightFlush(communityCards, card1Name, card2Name)
        if (isSF) {
            return isSF
        }
        isFOAK = isFourOfAKind(communityCards, card1Name, card2Name)
        if (isFOAK) {
            return isFOAK
        }
        isFHouse = isFullHouse(communityCards, card1Name, card2Name)
        if (isFHouse) {
            return isFHouse
        }
        isFl = isFlush(communityCards, card1Name, card2Name)
        if (isFl) {
            return isFl
        }
        isStr = isStraight(communityCards, card1Name, card2Name)
        if (isStr) {
            return isStr
        }
        isTOAK = isThreeOfAKind(communityCards, card1Name, card2Name)
        if (isTOAK) {
            return isTOAK
        }
        isTP = isTwoPair(communityCards, card1Name, card2Name)
        if (isTP) {
            return isTP
        }
        isP = isPair(communityCards, card1Name, card2Name)
        if (isP) {
            return isP
        }
        isHC = isHighCard(communityCards, card1Name, card2Name)
        if (isHC) {
            return isHC
        }
}

function isRoyal(comCards, card1Name, card2Name) {
    if (comCards.length < 3) {
        return
    }

    let cards = comCards.map(card => {
        return card.color
    })

    cards.push(card1Name)
    cards.push(card2Name)

    cards.sort((a, b) => {
        return a.split(/\D/)[1] - b.split(/\D/)[1]
    })

    let cardsCopy = [...cards]
    cards = cards.join("");

    if (cards.includes("C10-10C11-11C12-12C13-13C14-14") || cards.includes("D10-10D11-11D12-12D13-13D14-14") ||
        cards.includes("H10-10H11-11H12-12H13-13H14-14") || cards.includes("S10-10S11-11S12-12S13-13S14-14")
    ) {
        let lengthOfCards = cardsCopy.length
        return {
            power: 1,
            name: hands[0],
            cards: [cardsCopy[lengthOfCards - 5], cardsCopy[lengthOfCards - 4], cardsCopy[lengthOfCards - 3], cardsCopy[lengthOfCards - 2], cardsCopy[lengthOfCards - 1]]
        }
    }
    return false
}

function isStraightFlush(comCards, card1Name, card2Name) {
    if (comCards.length < 3) {
        return
    }
    let cards = comCards.map(card => {
        return card.color
    })

    cards.push(card1Name)
    cards.push(card2Name)

    cards.sort((a, b) => {
        return b.split(/\D/)[1] - a.split(/\D/)[1]
    })

    cards.sort((a, b) => {
        return b.split(/\d/)[0].localeCompare(a.split(/\d/)[0])
    })

    let hearts = cards.filter((card) => card[0] === "H");
    let diamonds = cards.filter((card) => card[0] === "D");
    let spades = cards.filter((card) => card[0] === "S");
    let clubs = cards.filter((card) => card[0] === "C");

    let suits = [hearts, diamonds, spades, clubs]

    for (let index = 0; index < suits.length; index++) {
        if (suits[index].length < 5) {
            continue;
        }
        let numberOfStraighNums = 0
        for (let i = suits[index].length - 1; i >= 1; i--) {
            if (+suits[index][i].split(/\D/)[1] - 1 === +suits[index][i - 1].split(/\D/)[1]) {
                numberOfStraighNums++
                if (numberOfStraighNums === 4) {
                    while(suits[index].length > 5){
                        suits[index].pop()
                    }
                    return {
                        power: 2,
                        name: hands[1],
                        cards: suits[index]
                    }
                }
            }
            else {
                numberOfStraighNums = 0
            }
        }
    }
}

function isFourOfAKind(comCards, card1Name, card2Name) {
    if (comCards.length < 2) {
        return
    }
    let cards = comCards.map((card => {
        return card.color
    }))
    cards.push(card1Name, card2Name)

    cards.sort((a, b) => {
        return a.split(/\D/)[1] - b.split(/\D/)[1]
    })

    let numOfSameRanks = 0;
    let temoArr = []

    for (let index = cards.length - 1; index >= 1; index--) {
        if (+cards[index].split(/\D/)[1] === +cards[index - 1].split(/\D/)[1]) {
            numOfSameRanks++;
            temoArr.push(cards[index])
            if (numOfSameRanks === 3) {
                temoArr.push(cards[index - 1])
                for (let index = cards.length - 1; index >= 0; index--) {
                    if(!temoArr.includes(cards[index])){
                        temoArr.push(cards[index])
                        break;
                    }
                }
                return {
                    power: 3,
                    name: hands[2],
                    cards: temoArr
                }
            }
        }
        else {
            temoArr.length = 0
            numOfSameRanks = 0;
        }
    }
}

function isFullHouse(comCards, card1Name, card2Name) {
    if (comCards.length < 3) {
        return
    }

    let numOfThreeEqualCards = 0;
    let numOfTwoEqualCards = 0;

    let cards = comCards.map((card => {
        return card.color
    }))

    cards.push(card1Name, card2Name)

    cards.sort((a, b) => {
        return a.split(/\D/)[1] - b.split(/\D/)[1]
    })

    let tempArr = []

    for (let index = cards.length - 1; index >= 1; index--) {
        if (cards[index].split(/\D/)[1] === cards[index - 1].split(/\D/)[1]) {
            numOfThreeEqualCards++;
            if (numOfThreeEqualCards === 2) {
                tempArr.push(cards[index], cards[index - 1], cards[index + 1])
                break;
            }
        }
        else {
            numOfThreeEqualCards = 0
        }
    }

    for (let index = cards.length - 1; index >= 1; index--) {
        if (cards[index].split(/\D/)[1] === cards[index - 1].split(/\D/)[1] && !tempArr.includes(cards[index])) {
            numOfTwoEqualCards++
            if (numOfThreeEqualCards) {
                tempArr.push(cards[index], cards[index - 1])
                break;
            }
        }
        else {
            numOfTwoEqualCards = 0;
        }

    }
    if (tempArr.length === 5) {
        return {
            power: 4,
            name: hands[3],
            cards: tempArr
        }
    }
}


function isFlush(comCards, card1Name, card2Name) {
    if (comCards.length < 3) {
        return
    }

    let cards = comCards.map((card => {
        return card.color
    }))

    cards.push(card1Name, card2Name)

    cards.sort((a, b) => {
        if (a[0] === b[0]) {
            return b.split(/\D/)[1] - a.split(/\D/)[1]
        }
        return b[0].localeCompare(a[0])
    })

    let hearts = cards.filter((card) => card[0] === "H")
    let diamonds = cards.filter((card) => card[0] === "D")
    let clubs = cards.filter((card) => card[0] === "C")
    let spades = cards.filter((card) => card[0] === "S")

    if (hearts.length === 5) {
        return {
            power: 5,
            name: hands[4],
            cards: hearts
        }
    }
    if (diamonds.length === 5) {
        return {
            power: 5,
            name: hands[4],
            cards: diamonds
        }
    }
    if (clubs.length === 5) {
        return {
            power: 5,
            name: hands[4],
            cards: clubs
        }
    }
    if (spades.length === 5) {
        return {
            power: 5,
            name: hands[4],
            cards: spades
        }
    }
}

function isStraight(comCards, card1Name, card2Name) {
    if (comCards.length < 3) {
        return
    }
    let cards = comCards.map((card => {
        return card.color
    }))

    cards.push(card1Name, card2Name)

    cards.sort((a, b) => {
        return a.split(/\D/)[1] - b.split(/\D/)[1]
    })

    let isStr = 0
    let tempArr = []

    for (let index = cards.length - 1; index >= 1; index--) {
        if (+cards[index].split(/\D/)[1] - 1 === +cards[index - 1].split(/\D/)[1]) {
            isStr++
            tempArr.push(cards[index])
            if (isStr === 4) {
                tempArr.push(cards[index - 1])
                tempArr.sort((a, b) => {
                    return b.split(/\D/)[1] - a.split(/\D/)[1]
                })
                return {
                    power: 6,
                    name: hands[5],
                    cards: tempArr
                }
            }
        }
        else {
            tempArr.length = 0
            isStr = 0
        }
    }
}

function isThreeOfAKind(comCards, card1Name, card2Name) {
    if (comCards.length < 1) {
        return
    }

    let cards = comCards.map((card => {
        return card.color
    }))

    cards.push(card1Name, card2Name)

    cards.sort((a, b) => {
        return a.split(/\D/)[1] - b.split(/\D/)[1]
    })

    let numOfEqualCards = 0
    let tempArr = []

    for (let index = cards.length - 1; index >= 1; index--) {
        if (+cards[index].split(/\D/)[1] === +cards[index - 1].split(/\D/)[1]) {
            numOfEqualCards++
            tempArr.push(cards[index])
            if (numOfEqualCards === 2) {
                tempArr.push(cards[index - 1])
                let buffArr = []
                for (let index = cards.length - 1; index >= 0; index--) {
                    if (!tempArr.includes(cards[index])) {
                        buffArr.push(cards[index])
                    }
                    if (buffArr.length === 2) {
                        break;
                    }
                }
                buffArr.sort((a,b) => {
                    return b.split(/\D/)[1] - a.split(/\D/)[1]
                })
                tempArr.push(...buffArr)
                return {
                    power: 7,
                    name: hands[6],
                    cards: tempArr
                }
            }
        }
        else {
            numOfEqualCards = 0;
        }
    }
}

function isTwoPair(comCards, card1Name, card2Name) {
    if (comCards.length < 2) {
        return
    }

    let cards = comCards.map((card => {
        return card.color
    }))

    cards.push(card1Name, card2Name)

    cards.sort((a, b) => {
        return a.split(/\D/)[1] - b.split(/\D/)[1]
    })

    let firstHalf = 0
    let secondHalf = 0

    let twoPairs = []

    for (let index = cards.length - 1; index >= 1; index--) {
        if (+cards[index].split(/\D/)[1] === +cards[index - 1].split(/\D/)[1]) {
            firstHalf++;
            if (firstHalf) {
                twoPairs.push(cards[index], cards[index - 1])
            }
        }
        else {
            firstHalf = 0;
        }
    }

    for (let index = cards.length - 1; index >= 1; index--) {
        if (+cards[index].split(/\D/)[1] === +cards[index - 1].split(/\D/)[1] && !twoPairs.includes(cards[index])) {
            secondHalf++;
            if (secondHalf) {
                twoPairs.push(cards[index], cards[index - 1])
            }
        }
        else {
            secondHalf = 0;
        }
    }

    if (twoPairs.length === 4) {
        twoPairs.sort((a, b) => {
            return b.split(/\D/)[1] - a.split(/\D/)[1]
        })

        for (let index = cards.length - 1; index >= 0; index--) {
            if (twoPairs.length === 5) {
                break;
            }
            if (!twoPairs.includes(cards[index])) {
                twoPairs.push(cards[index])
            }
        }
        return {
            power: 8,
            name: hands[7],
            cards: twoPairs
        }
    }
}

function isPair(comCards, card1Name, card2Name) {
    let cards = comCards.map((card => {
        return card.color
    }))

    cards.push(card1Name, card2Name)

    cards.sort((a, b) => {
        return a.split(/\D/)[1] - b.split(/\D/)[1]
    })

    let tempArr = []

    for (let index = cards.length - 1; index >= 1; index--) {
        if (+cards[index].split(/\D/)[1] === +cards[index - 1].split(/\D/)[1]) {
            tempArr.push(cards[index - 1], cards[index])
            let buffArr = []
            for (let index = cards.length - 1; index >= 0; index--) {
                if(buffArr.length === 3){
                    break;
                }
                if(!tempArr.includes(cards[index])){
                    buffArr.push(cards[index])
                }
            }
            buffArr.sort((a,b) => {
                return b.split(/\D/)[1] - a.split(/\D/)[1] 
            })
            tempArr.push(...buffArr)
            return {
                power: 9,
                name: hands[8],
                cards: tempArr
            };
        }
    }
}

function isHighCard(comCards, card1Name, card2Name) {
    let cards = comCards.map((card => {
        return card.color
    }))

    cards.push(card1Name, card2Name)

    cards.sort((a, b) => {
        return a.split(/\D/)[1] - b.split(/\D/)[1]
    })

    let tempArr = [...cards]
    while(tempArr.length > 5){
        tempArr.pop()
    }
    tempArr = tempArr.reverse()

    return {
        power: 10,
        name: hands[9],
        cards: tempArr
    }
}

export { determinePlayerHand }