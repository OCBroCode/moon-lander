import GameElement from './game-element.mjs';
import { MODEL } from './../model.mjs';
import { dispatchEventWithDetails } from './../events.mjs';

export default class GameControls extends GameElement {
	#formElements = MODEL;

	constructor() {
		super();
		this.registerHandlers();
		this.addEventListener('change', event => {console.log(event.target)});
	}

	createRangeControl(keyName, modelValue) {
		let controlId = `rng_${keyName}`;

		return `<div class="control">
			<label for="${controlId}">${modelValue.name}</label><br>
			<input type="range" min="${modelValue.min}" max="${modelValue.max}" id="${controlId}" name="${keyName}" value="${modelValue.initial}">
			<output for="${keyName}" name="result_${keyName}"></output>
		</div>`;
	}

	createRadioControl(keyName, modelValue, state) {
		let controlId = `rdo_${keyName}_${state}`;
		let labelValue = state === 'true' ? modelValue.labelTrue : modelValue.labelFalse;

		return `<label for="${controlId}">
			<input type="radio" name="${keyName}" id="${controlId}" value="${state}">&nbsp;${labelValue}
		</label>`;
	}

	createRadioControlGroup(keyName, modelValue) {
		let htmlString = '';

		if (modelValue.type === 'boolean') {
			htmlString = `<div class="control">
				${this.createRadioControl(keyName, modelValue, 'true')}
				${this.createRadioControl(keyName, modelValue, 'false')}
				<output for="${keyName}" name="result_${keyName}"></output>
			</div>`;
		}

		return htmlString;
	}

	createFormControls() {
		let form = document.createElement('form');

		Object.keys(this.#formElements).forEach((key) => {
			let value = this.#formElements[key];

			switch (value.formElement) {
				case 'range':
					form.innerHTML += this.createRangeControl(key, value);
					break;
				case 'radio':
					form.innerHTML += this.createRadioControlGroup(key, value);
					break;
			}
		});

		this.appendChild(form);
		this.dispatchEvent(new Event('FormElementsAdded', { bubbles: true }));
	}

	gameStateChangedEventHandler(event) {
		if (event.detail) {
			this.querySelector(`[name="running"][value="${event.detail.running}"]`).click();
		}
	}

	landerStateChangedEventHandler(event) {
		if (event.detail) {
			Object.keys(event.detail).forEach((keyName) => {
				let currentValue = parseInt(this.querySelector(`[name="${keyName}"]`).value);
				this.querySelector(`[name="${keyName}"]`).value = currentValue + event.detail[keyName];
			});
		}
	}

	keyboardHandler(event) {
		let landerChange = null;
		let gameChange = null;

		switch (event.key) {
			case 'ArrowUp':
				landerChange = {
					thruster: 10
				};
				break;
			case 'ArrowDown':
				landerChange = {
					thruster: -10
				};
				break;
			case 'ArrowRight':
				landerChange = {
					rotation: 10
				};
				break;
			case 'ArrowLeft':
				landerChange = {
					rotation: -10
				};
				break;
			case 'Escape':
				gameChange = {
					running: false
				};
				break;
			case 'Enter':
				gameChange = {
					running: true
				};
				break;
		}

		if (landerChange) dispatchEventWithDetails('LanderStateChanged', landerChange);
		if (gameChange) dispatchEventWithDetails('GameStateChanged', gameChange);
	}

	registerHandlers() {
		document.addEventListener('GameStateChanged', this.gameStateChangedEventHandler);
		document.addEventListener('LanderStateChanged', this.landerStateChangedEventHandler);
		document.addEventListener('keyup', this.keyboardHandler);
	}

	connectedCallback() {
		super.connectedCallback();
		this.createFormControls();
	}
}

