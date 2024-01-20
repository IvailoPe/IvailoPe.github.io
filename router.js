import page from "./node_modules/page/page.mjs";
import { renderGame } from "./source/gameSrc/renderGame.js";
import { addToCtx } from "./ctxFuncs.js";

export function addRouting(){
    page(addToCtx)
    page("ivailope.github.io/playGame",renderGame) 
    page("https://ivailope.github.io/home",(ctx) => {
        ctx.removeContent()
    })
     
    page.start()
}