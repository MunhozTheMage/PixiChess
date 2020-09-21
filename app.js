// External
import * as PIXI from 'pixi.js';

// Classes
import Game from './src/game.js';

// Variables
const app = new PIXI.Application({
    width: 720,
    height: 720,
    backgroundColor: 0xAAAAAA,
});
const game = new Game(app);

// Initialization
app.stage.interactive = true;
document.body.appendChild(app.view);
game.initializeGame();
app.stage.on("click", (e) => {
    game.event_clickController(e);
});