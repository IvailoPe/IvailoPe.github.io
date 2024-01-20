import { gameHtml } from "../templates/gameHtml.js"
import { initGame } from "./game.js";

function renderGame(ctx){
  ctx.renderContent(gameHtml);
  initGame()
}

export {renderGame}