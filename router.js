import page from "./node_modules/page/page.mjs";
import { renderGame } from "./source/gameSrc/renderGame.js";
import { addToCtx } from "./ctxFuncs.js";

export function addRouting(){
    page(addToCtx)
    page("/playGame",renderGame) 
    page("/home",(ctx) => {
        ctx.removeContent()
    })
     
    page.start()
}