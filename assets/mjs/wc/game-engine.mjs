import GameElement from './game-element.mjs';
import { MODEL } from './../model.mjs';

export default class GameEngine extends GameElement {

	modelLander = {};
	#gameRunning;
	#gameEventFrequency = 10; // Milliseconds
	#gameDuration = 0; // Counts the time elapsed based on multiples of `this.#gameEventFrequency`
	#gameInterval; // Placeholder for window.setInterval so that it can be cleared later.

	#gameRunningStateChanged = (runningState) => {
		console.log('running', runningState);
		this.#gameRunning = runningState;
		this.dispatchEvent(
			new CustomEvent('GameStateChanged', {
				bubbles: true,
				detail: {
					running: runningState
				}
			})
		);
	}

	#landerStateChanged = (values) => {
		console.log('new lander state', values);
		this.dispatchEvent(
			new CustomEvent('LanderStateChanged', {
				bubbles: true,
				detail: values
			})
		);
	}

	constructor() {
		super();

		Object.keys(MODEL).forEach((keyName) => {
			let currentItem = MODEL[keyName];
			if (currentItem.affects === 'lander') this.modelLander[keyName] = currentItem.initial;
		});
	}

	#gameLoop = function () {
		this.#gameDuration++;

		if (this.#gameDuration > 1_000) {
			this.stopGame();
		}
	}

	startGame() {
		this.#gameRunningStateChanged(true);
		this.#gameDuration = 0;
		this.#gameInterval = window.setInterval(this.#gameLoop.bind(this), this.#gameEventFrequency);
	}

	stopGame() {
		this.#gameRunningStateChanged(false);
		window.clearInterval(this.#gameInterval);
	}

	setInitialValuesAndStart() {
		this.#landerStateChanged(this.modelLander);
		this.startGame();
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener('FormElementsAdded', this.setInitialValuesAndStart.bind(this));
	}


}

