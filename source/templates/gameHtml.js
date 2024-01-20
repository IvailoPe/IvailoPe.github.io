let gameHtml = 
`
<img id="table" src="./pictures/table.png" alt="">
<img id="userF" src="./pictures/cards/S14-14.png" alt="">
<img id="userS" src="./pictures/cards/C11-11.png" alt="">
<img id="player1F" src="./pictures/cards/C11-11.png" alt="">
<img id="player1S" src="./pictures/cards/C11-11.png" alt="">
<img id="player2F" src="./pictures/cards/C11-11.png" alt="">
<img id="player2S" src="./pictures/cards/C11-11.png" alt="">
<img id="player3F" src="./pictures/cards/C11-11.png" alt="">
<img id="player3S" src="./pictures/cards/C11-11.png" alt="">
<img id="player4F" src="./pictures/cards/C11-11.png" alt="">
<img id="player4S" src="./pictures/cards/C11-11.png" alt="">
<img id="userIcon" src="./pictures/playerIcon1.png" alt="">
<img id="player1Icon" src="./pictures/playerIcon1.png" alt="">
<img id="player2Icon" src="./pictures/playerIcon1.png" alt="">
<img id="player3Icon" src="./pictures/playerIcon1.png" alt="">
<img id="player4Icon" src="./pictures/playerIcon1.png" alt="">
<img id="userBetIcon" src="./pictures/playersBetsIcon.png" alt="">
<img id="player1BetIcon" src="./pictures/playersBetsIcon.png" alt="">
<img id="player2BetIcon" src="./pictures/playersBetsIcon.png" alt="">
<img id="player3BetIcon" src="./pictures/playersBetsIcon.png" alt="">
<img id="player4BetIcon" src="./pictures/playersBetsIcon.png" alt="">
<div id="pot-container">
<p style="margin: 0; text-align: center; font-family: Trebuchet MS;">Pot</p>
<img src="./pictures/playersBetsIcon.png" alt="">
<p style="margin: 0; text-align: center; font-family: Trebuchet MS; position: absolute; top: 60px; left: 4px; width: 40px;" id="pot"></p>
</div>
<div id="communityCards">
<img src="" alt="">
<img src="" alt="">
<img src="" alt="">
<img src="" alt="">
<img src="" alt="">
</div>
<p id="userBetSize"></p>
<p id="player1BetSize"></p>
<p id="player2BetSize"></p>
<p id="player3BetSize"></p>
<p id="player4BetSize"></p>
<div id="logs"></div>
<div id="user-buttons">
<input type="range">
<span>2</span>
<div>
<button class="user-iteraction">Check</button>
<button class="user-iteraction">Call</button>
<button class="user-iteraction">Fold</button>
</div>
</div>
`

export {gameHtml}