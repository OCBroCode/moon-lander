import GameElement from './game-element.mjs';

export default class GameScene extends GameElement {

    #gameRunning = false;
    #gameEventFrequency = 10; // Milliseconds
    #gameDuration = 0; // Counts the time elapsed based on multiples of `this.#gameEventFrequency`
    #gameInterval; // Placeholder for window.setInterval so that it can be cleared later.

    #gameLoop = function() {
        this.#gameDuration++;

        if (this.#gameDuration > 1_000) {
            this.stopGame();
        }
    }

    startGame() {
        console.log('Starting');
        this.#gameRunning = true;
        this.#gameDuration = 0;
        this.#gameInterval = window.setInterval(this.#gameLoop.bind(this), this.#gameEventFrequency);
    }

    stopGame() {
        console.log('Stopping');
        this.#gameRunning = false;
        window.clearInterval(this.#gameInterval);
    }

    connectedCallback() {
        super.connectedCallback();
        this.startGame();
    }
  

}

