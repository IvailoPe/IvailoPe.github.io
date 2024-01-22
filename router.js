import page from "./node_modules/page/page.mjs";
import { renderGame } from "./source/gameSrc/renderGame.js";
import { addToCtx } from "./ctxFuncs.js";
import { homeView } from "./source/templates/homeView.js";
import { howToView } from "./source/templates/howToView.js";
import { clearCards  } from "./source/gameSrc/gameLogic.js";
import { resetCards } from "./source/gameSrc/Players&Cards/gameCards.js"

let opennedGames = []

export function addRouting(){
    page(addToCtx)
    page("/playGame",(ctx) => {
        opennedGames.push(true)
        if(opennedGames.length === 2){
            clearCards();
            resetCards()
            opennedGames.pop()
        }
        renderGame(ctx)
    }) 
    page("/home",(ctx) => {
        ctx.removeContent()
        ctx.renderContent(homeView)
    })
    page("/",(ctx) => {
        ctx.removeContent()
        ctx.renderContent(homeView)
    })
    page("/how-to",(ctx) => {
        ctx.removeContent()
        ctx.renderContent(howToView)
    })
     
    page.start()
}