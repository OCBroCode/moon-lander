import GameElement from './game-element.mjs';
import { MODEL } from './../model.mjs';

export default class GameControls extends GameElement {
	#formElements = MODEL;

	createFormControlWrapper() {
		let wrapper = document.createElement('div');
		wrapper.className = 'control';

		return wrapper;
	}

	createFormControlLabel(labelValue, controlId) {
		let label = document.createElement('label');

		label.setAttribute('for', controlId);
		label.textContent = labelValue;

		return label;
	}

	createRangeControl(keyName, modelValue) {
		let wrapper = this.createFormControlWrapper();
		let br = document.createElement('br');
		let label = this.createFormControlLabel(modelValue.name, `rng_${keyName}`);
		let input = document.createElement('input');

		input.setAttribute('type', 'range');
		input.setAttribute('min', modelValue.min);
		input.setAttribute('max', modelValue.max);
		input.setAttribute('name', keyName);
		input.setAttribute('id', `rng_${keyName}`);
		input.setAttribute('value', modelValue.initial);

		wrapper.appendChild(label);
		wrapper.appendChild(br);
		wrapper.appendChild(input);
		return wrapper;
	}

	createRadioControl(keyName, modelValue, state) {
		let controlId = `rdo_${keyName}_${state}`;
		let labelValue = state === 'true' ? modelValue.labelTrue : modelValue.labelFalse;
		let label = this.createFormControlLabel(labelValue, controlId);
		let input = document.createElement('input');

		input.setAttribute('type', 'radio');
		input.setAttribute('name', keyName);
		input.setAttribute('id', controlId);
		input.setAttribute('value', state);

		if (modelValue.initial === state) {
			input.setAttribute('checked', 'checked');
		}

		label.prepend(input);

		return label;
	}

	createRadioControlGroup(keyName, modelValue) {
		if (modelValue.type === 'boolean') {
			let wrapper = this.createFormControlWrapper();

			['true', 'false'].forEach((state) => {
				wrapper.appendChild(this.createRadioControl(keyName, modelValue, state));
			});

			return wrapper;
		}
	}

	createFormControls() {
		let form = document.createElement('form');

		Object.keys(this.#formElements).forEach((key) => {
			let value = this.#formElements[key];
			let control = null;

			switch (value.formElement) {
				case 'range':
					// this.createRangeControl(key, value);
					control = this.createRangeControl(key, value);
					break;
				case 'radio':
					// this.createRadioControlGroup(key, value);
					control = this.createRadioControlGroup(key, value);
					break;
			}

			if (control) {
				form.appendChild(control);
			}
		});

		this.appendChild(form);
		this.dispatchEvent(new Event('FormElementsAdded', {bubbles: true}));
	}

	connectedCallback() {
		super.connectedCallback();
		this.createFormControls();
	}
}

