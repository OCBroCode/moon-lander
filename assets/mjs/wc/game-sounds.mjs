import GameElement from './game-element.mjs?date=2023-12-26';

const AudioContext = window.AudioContext || window.webkitAudioContext;

export default class GameSounds extends GameElement {
	sounds = {
		booster: null,
		thruster: null,
	};
	#audioCtx = new AudioContext();
	#audioGain = this.#audioCtx.createGain();

	constructor() {
		super();
		
		Object.keys(this.sounds).forEach(soundId => {
			this.sounds[soundId] = this.#audioCtx.createMediaElementSource(this.querySelector(`[data-sound-id="${soundId}"]`));
			this.sounds[soundId].connect(this.#audioGain).connect(this.#audioCtx.destination);
		});
	}

	playSound(soundId, volume) {
		if (this.#audioCtx.state === 'suspended') {
			this.#audioCtx.resume();
		}

		if (volume >= 0 && volume <= 2) {
			this.#audioGain.gain.value = volume;
		} else {
			this.#audioGain.gain.value = 1; // Set to 50% / normal volume
		}

		this.querySelector(`[data-sound-id="${soundId}"]`).play();
	}

	stopSound(soundId) {
		this.querySelector(`[data-sound-id="${soundId}"]`).pause();
	}

	connectedCallback() {
		super.connectedCallback();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}
}