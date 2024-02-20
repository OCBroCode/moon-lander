import GameElement from './game-element.mjs?date=2023-12-26';
import { MODEL, KEYMAP } from './../model.mjs?date=2023-12-26';

const keyboardEventsToWatch = ['keydown', 'keyup'];

export default class GameEngine extends GameElement {

	modelLander = {};

	#gameRunning;
	#gameStarted;
	#gameEnded;
	#gameEventFrequency = 50; // Milliseconds
	#gameDuration = 0; // Counts the time elapsed based on multiples of `this.#gameEventFrequency`
	#gameInterval; // Placeholder for window.setInterval so that it can be cleared later.
	#keyMap = KEYMAP;

	#gameRunningStateChanged = (runningState) => {
		this.#gameRunning = runningState;
	}

	#startGame() {
		this.#gameStarted = true;
		this.#gameRunningStateChanged(true);
		this.#addLanderKeyboardHandlers();
		this.#gameDuration = 0;
		this.#gameInterval = window.setInterval(this.gameLoop, this.#gameEventFrequency);
	}

	#unpauseGame() {
		if (!this.#gameRunning) {
			this.#addLanderKeyboardHandlers();
			this.#gameRunningStateChanged(true);
			this.#gameInterval = window.setInterval(this.gameLoop, this.#gameEventFrequency);
		}
	}

	#pauseGame() {
		this.#gameRunningStateChanged(false);
		this.#removeLanderKeyboardHandlers();
		window.clearInterval(this.#gameInterval);
	}

	#stopGame() {
		this.#gameEnded = true;
		console.log('Game ended after duration', this.#gameDuration);
		this.#removeLanderKeyboardHandlers();
		window.clearInterval(this.#gameInterval);
	}

	#addLanderKeyboardHandlers() {
		keyboardEventsToWatch.forEach(eventName => {
			document.addEventListener(eventName, this.handleLanderKeyboardInupts);
		});
	}

	#removeLanderKeyboardHandlers() {
		keyboardEventsToWatch.forEach(eventName => {
			document.removeEventListener(eventName, this.handleLanderKeyboardInupts);
		});
	}

	#updateCustomProperties() {
		Object.keys(this.modelLander).forEach(landerProperty => {
			let value = this.modelLander[landerProperty];
			this.style.setProperty(`--lander_${landerProperty}`, value);
		})
	}

	constructor() {
		super();

		this.handleGameStateKeyboardInupts = this.handleGameStateKeyboardInupts.bind(this);
		this.handleLanderKeyboardInupts = this.handleLanderKeyboardInupts.bind(this);
		this.setInitialValuesAndStart = this.setInitialValuesAndStart.bind(this);
		this.gameLoop = this.gameLoop.bind(this);
	}

	setInitialValuesAndStart() {
		Object.keys(MODEL).forEach((keyName) => {
			let currentItem = MODEL[keyName];
			if (currentItem.affects === 'lander') {
				this.modelLander[keyName] = currentItem.initial;
			}
		});
		this.#updateCustomProperties();
		this.#startGame();
	}

	checkLimits() {
		for (let [landerProperty, value] of Object.entries(this.modelLander)) {
			if (landerProperty === 'position_x') {
				if (value < 20 || value > 80) {
					console.log('WARNING: Weak signal');
				}
			}
			if (landerProperty === 'rotation') {
				if (value < -75 || value > 75) {
					console.log('WARNING: Rotation nearing limits');
				}
			}
			if (landerProperty === 'position_y') {
				if (value < 20) {
					console.log('WARNING: Low altitude');
				}
				if (value > 80) {
					console.log('WARNING: High altitude');
				}
			}
			if (value > MODEL[landerProperty].max) {
				if (landerProperty === 'thruster' || landerProperty === 'rotation') {
					this.modelLander[landerProperty] = MODEL[landerProperty].max;
				}
			}
			if (value < MODEL[landerProperty].min) {
				if (landerProperty === 'thruster' || landerProperty === 'rotation') {
					this.modelLander[landerProperty] = MODEL[landerProperty].min;
				}
			}
		}
	}

	handleGameStateKeyboardInupts(event) {
		let keyName = event.key;

		if (keyName == 'Enter') {
			if (this.#gameStarted && !this.#gameRunning) {
				this.#unpauseGame();
			} else if (!this.#gameStarted) {
				this.#startGame();
			}
		} else if (keyName == 'Escape' && this.#gameStarted) {
			this.#gameRunning ? this.#pauseGame() : this.#stopGame();
		}
	}

	handleLanderKeyboardInupts(event) {
		let keyName = event.key;
		let eventType = event.type;

		if (this.#keyMap[keyName]) {
			this.#keyMap[keyName].active = (eventType === 'keydown') ? true : false;
		}
	}

	gameLoop() {
		// Increment game duration counter
		this.#gameDuration = this.#gameDuration + this.#gameEventFrequency;

		// Go through the batched inputs and change the lander's position
		Object.keys(this.#keyMap).forEach(keyName => {
			let keyItem = this.#keyMap[keyName];
			let landerProperty = this.#keyMap[keyName].affects;
			if (keyItem.active) {
				this.modelLander[landerProperty] = this.modelLander[landerProperty] + keyItem.change;
			}
		});

		this.checkLimits();
		this.#updateCustomProperties();
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener('InstrumentationAdded', this.setInitialValuesAndStart, {once: true});
		document.addEventListener('keydown', this.handleGameStateKeyboardInupts);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		document.removeEventListener('keydown', this.handleGameStateKeyboardInupts);
	}


}

