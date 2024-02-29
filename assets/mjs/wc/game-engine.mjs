import GameElement from './game-element.mjs?date=2023-12-26';
import { MODEL, KEYMAP, PARAMETERS, INDICATORS } from './../model.mjs?date=2023-12-26';

const keyboardEventsToWatch = ['keydown', 'keyup'];

export default class GameEngine extends GameElement {

	modelLander = {};
	modelIndicators = {};

	#gameRunning;
	#gameStarted;
	#gameEnded;
	#timers = {
		gameTimeStart: 0,
		elapsedTime: 0,
		currentTime: 0,
	};
	#keyMap = KEYMAP;
	#limitsExceeded = false;
	#animationRef;
	#landerElem;
	#soundsElem;

	#gameRunningStateChanged = (runningState) => {
		this.#gameRunning = runningState;
	}

	#startGame() {
		this.#gameStarted = true;
		this.#gameRunningStateChanged(true);
		this.#addLanderKeyboardHandlers();
		this.#timers.gameTimeStart = performance.now();
		this.#animationRef = requestAnimationFrame(this.gameLoop);
	}

	#unpauseGame() {
		if (!this.#gameRunning) {
			this.#addLanderKeyboardHandlers();
			this.#gameRunningStateChanged(true);
			this.#animationRef = requestAnimationFrame(this.gameLoop);
		}
	}

	#pauseGame() {
		this.#gameRunningStateChanged(false);
		this.#removeLanderKeyboardHandlers();
		cancelAnimationFrame(this.#animationRef);
	}

	#stopGame() {
		this.#gameEnded = true;
		console.log('Game ended after duration', performance.now() - this.#timers.gameTimeStart);
		this.#removeLanderKeyboardHandlers();
		cancelAnimationFrame(this.#animationRef);
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
		});
		Object.keys(this.modelIndicators).forEach(indicatorProperty => {
			let value = this.modelIndicators[indicatorProperty];
			this.style.setProperty(`--lander_${indicatorProperty}`, value);
		});
		
		let scaledSurfaceRadius = 10_000 - (this.modelLander.position_y * this.modelLander.position_y);
		this.style.setProperty(`--surface-radius`, scaledSurfaceRadius);
	}

	#playSounds() {
		if (this.modelLander.thruster > 0) {
			let normalisedVolume = this.modelLander.thruster / 50;
			this.#soundsElem.playSound('booster', normalisedVolume);
		}
	}

	constructor() {
		super();

		this.#soundsElem = this.querySelector('game-sounds');
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
		Object.keys(INDICATORS).forEach((keyName) => {
			let currentItem = INDICATORS[keyName];
			this.modelIndicators[keyName] = currentItem.initial;
		});
		this.#landerElem = this.querySelector('lander-vehicle');
		this.#updateCustomProperties();
		this.#startGame();
	}

	checkLimits() {
		for (let [landerProperty, value] of Object.entries(this.modelLander)) {
			if (landerProperty === 'position_x') {
				if (value < 20 || value > 80) {
					this.modelIndicators.signal_weak = 1;
				} else {
					this.modelIndicators.signal_weak = 0;
				}
			}
			if (landerProperty === 'rotation') {
				if (value < -75 || value > 75) {
					this.modelIndicators.rotation_high = 1;
				} else {
					this.modelIndicators.rotation_high = 0;
				}
				if (value > -10 && value < 10) {
					this.modelIndicators.rotation_good = 1;
				} else {
					this.modelIndicators.rotation_good = 0;
				}
			}
			if (landerProperty === 'position_y') {
				if (value <= MODEL[landerProperty].min || value >= MODEL[landerProperty].max) {
					this.modelIndicators.signal_lost = 1;
					this.#limitsExceeded = true;
					break;
				} else if (value < 20) {
					this.modelIndicators.altitude_low = 1;
				} else if (value > 80) {
					this.modelIndicators.altitude_high = 1;
				} else {
					this.modelIndicators.altitude_low = 0;
					this.modelIndicators.altitude_high = 0;
				}
			}
			if (value >= MODEL[landerProperty].max) {
				this.modelLander[landerProperty] = MODEL[landerProperty].max;
			}
			if (value <= MODEL[landerProperty].min) {
				this.modelLander[landerProperty] = MODEL[landerProperty].min;
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
		let item = this.#keyMap[keyName];
		if (item) {
			item.active = (eventType === 'keydown') ? true : false;
		}
	}

	updateLanderPosition() {
		// let timeSinceLastPosition = this.#timers.elapsedTime;

		// let newSpeed = parseFloat(this.modelLander.speed) + PARAMETERS.gravity - parseFloat(this.modelLander.thruster * 0.005);
		// this.modelLander.speed = newSpeed.toFixed(1);

		let newYPosition = parseFloat(this.modelLander.position_y - PARAMETERS.gravity + (this.modelLander.thruster * 0.005)).toFixed(2);

		// this.modelLander.thruster @ 50% = counters gravity @ 0.25
		this.modelLander.position_y = newYPosition;
		// this.modelLander.rotation = this.modelLander.rotation + this.modelLander.rotational_speed;
	}

	gameLoop() {
		this.#timers.elapsedTime = performance.now() - this.#timers.currentTime;
		this.#timers.currentTime = performance.now();

		// Go through the batched inputs and change the lander's position
		Object.keys(this.#keyMap).forEach(keyName => {
			let keyItem = this.#keyMap[keyName];
			let landerProperty = this.#keyMap[keyName].affects;
			if (keyItem.active) {
				this.modelLander[landerProperty] = this.modelLander[landerProperty] + keyItem.change;
			}
		});

		this.checkLimits();
		this.updateLanderPosition();
		this.#updateCustomProperties();
		this.#playSounds();

		if (this.#limitsExceeded) {
			this.#stopGame();
		} else {
			this.#animationRef = requestAnimationFrame(this.gameLoop);
		}
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

