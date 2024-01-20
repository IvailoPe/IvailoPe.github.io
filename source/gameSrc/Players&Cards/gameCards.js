let cards = [
    {card : 2,
        name: ["C2-2","D2-2","H2-2","S2-2"] 
    }
    ,
    {card : 3,
        name: ["C3-3","D3-3","H3-3","S3-3"] 
    }
    ,
    {card : 4,
        name: ["C4-4","D4-4","H4-4","S4-4"] 
    }
    ,
    {card : 5,
        name: ["C5-5","D5-5","H5-5","S5-5"] 
    }
    ,
    {card : 6,
        name: ["C6-6","D6-6","H6-6","S6-6"] 
    }
    ,
    {card : 7,
        name: ["C7-7","D7-7","H7-7","S7-7"] 
    }
    ,
    {card : 8,
        name: ["C8-8","D8-8","H8-8","S8-8"] 
    }
    ,
    {card : 9,
        name: ["C9-9","D9-9","H9-9","S9-9"] 
    }
    ,
    {card : 10,
        name: ["C10-10","D10-10","H10-10","S10-10"] 
    }
    ,
    {card : 11,
        name: ["C11-11","D11-11","H11-11","S11-11"] 
    }
    ,
    {card : 12,
        name: ["C12-12","D12-12","H12-12","S12-12"] 
    }
    ,
    {card : 13,
        name: ["C13-13","D13-13","H13-13","S13-13"] 
    }
    ,
    {card : 14,
        name: ["C14-14","D14-14","H14-14","S14-14"] 
    }
]

let copyOfCards = JSON.stringify(cards)

function resetCards(){
    cards = JSON.parse(copyOfCards)
}

export {cards,resetCards}