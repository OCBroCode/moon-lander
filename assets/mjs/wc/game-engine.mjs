import GameElement from './game-element.mjs';
import { MODEL } from './../model.mjs';

export default class GameEngine extends GameElement {

    modelLander = {};
		#gameRunning;
    #gameEventFrequency = 10; // Milliseconds
    #gameDuration = 0; // Counts the time elapsed based on multiples of `this.#gameEventFrequency`
    #gameInterval; // Placeholder for window.setInterval so that it can be cleared later.

		constructor() {
			super();

			Object.keys(MODEL).forEach((keyName) => {
				let currentItem = MODEL[keyName];
				if (currentItem.affects === 'lander') this.modelLander[keyName] = currentItem.initial;
			});
		}

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

		associateFormControls() {
			console.log(this.modelLander);
		}

    connectedCallback() {
        super.connectedCallback();
				this.addEventListener('FormElementsAdded', this.associateFormControls.bind(this));
        this.startGame();
    }
  

}

