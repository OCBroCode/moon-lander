import GameElement from './game-element.mjs';

export default class GameScene extends GameElement {

    #gameRunning = false;
    #gameEventFrequency = 10; // milliseconds

    #gameLoop = function() {
        this.#gameEventFrequency++;
        console.log('this.#gameEventFrequency', this.#gameEventFrequency);
    }

    startGame() {
        this.#gameRunning = true;
        window.setInterval(this.#gameLoop.bind(this), this.#gameEventFrequency);
    }

    stopGame() {
        this.#gameRunning = false;
        window.clearInterval(this.#gameLoop);
    }

    connectedCallback() {
        this.startGame();
        window.setTimeout(this.#stopGame, 1_000);
    }
  

}

