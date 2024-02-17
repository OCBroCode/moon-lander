import GameElement from './game-element.mjs';
import { MODEL } from './../model.mjs';
import { dispatchEventWithDetails } from './../events.mjs';

export default class GameEngine extends GameElement {

	modelLander = {};
	#gameRunning;
	#gameStarted;
	#gameEnded;
	#gameEventFrequency = 100; // Milliseconds
	#gameDuration = 0; // Counts the time elapsed based on multiples of `this.#gameEventFrequency`
	#gameInterval; // Placeholder for window.setInterval so that it can be cleared later.

	#gameRunningStateChanged = (runningState) => {
		this.#gameRunning = runningState;
		dispatchEventWithDetails('GameStateChange', {running: runningState});
	}

	#landerStateChanged = (values) => {
		dispatchEventWithDetails('LanderStateChanged', values);
	}

	constructor() {
		super();

		this.handleKeyboardInterrupts = this.handleKeyboardInterrupts.bind(this);
		this.setInitialValuesAndStart = this.setInitialValuesAndStart.bind(this);
		this.#gameLoop = this.#gameLoop.bind(this);
	}

	#gameLoop = function () {
		this.#gameDuration = this.#gameDuration + this.#gameEventFrequency;
		let newPositionYAdjustment = -1;
		
		this.modelLander.position_y = this.modelLander.position_y + newPositionYAdjustment;
		this.#landerStateChanged({position_y: newPositionYAdjustment});
	}

	startGame() {
		this.#gameStarted = true;
		this.#gameRunningStateChanged(true);
		this.#gameDuration = 0;
		this.#gameInterval = window.setInterval(this.#gameLoop, this.#gameEventFrequency);
	}

	pauseGame() {
		this.#gameRunning = false;
		this.#gameRunningStateChanged(false);
		window.clearInterval(this.#gameInterval);
	}

	unpauseGame() {
		if (!this.#gameRunning) {
			this.#gameRunning = true;
			this.#gameRunningStateChanged(true);
			this.#gameInterval = window.setInterval(this.#gameLoop, this.#gameEventFrequency);
		}
	}

	stopGame() {
		this.#gameEnded = true;
		console.log('Game ended after duration', this.#gameDuration);
		document.removeEventListener('keyup', this.handleKeyboardInterrupts);
		window.clearInterval(this.#gameInterval);
	}

	setInitialValuesAndStart() {
		Object.keys(MODEL).forEach((keyName) => {
			let currentItem = MODEL[keyName];
			if (currentItem.affects === 'lander') this.modelLander[keyName] = currentItem.initial;
			this.style.setProperty(`--lander_${keyName}`, currentItem.initial);
		});
		this.startGame();
	}

	handleKeyboardInterrupts(event) {
		switch (event.key) {
			case 'Enter':
				if (this.#gameStarted && !this.#gameRunning) {
					this.unpauseGame();
				} else if (!this.#gameStarted) {
					this.startGame();
				}
				break;
			case 'Escape':
				if (this.#gameStarted) {
					(this.#gameRunning) ? this.pauseGame() : this.stopGame();
				}
				break;
		}
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener('FormElementsAdded', this.setInitialValuesAndStart, {once: true});
		document.addEventListener('keyup', this.handleKeyboardInterrupts);
	}


}

