import GameElement from './game-element.mjs';
import { MODEL } from './../model.mjs';

export default class GameControls extends GameElement {
	#formElements = MODEL;

	createRangeControl(keyName, modelValue) {
		let controlId = `rng_${keyName}`;
		let wrapper = this.querySelector('#tmpl_control_range').content.cloneNode(true);

		let label = wrapper.querySelector('label');
		label.textContent = modelValue.name;
		label.setAttribute('for', controlId);

		let input = wrapper.querySelector('input');
		input.min = modelValue.min;
		input.max = modelValue.max;
		input.name = keyName;
		input.id = controlId;
		input.value = modelValue.initial;

		let output = wrapper.querySelector('output');
		output.setAttribute('for', keyName);
		output.name = `result_${keyName}`;

		return wrapper;
	}

	createRadioControl(keyName, modelValue, state) {
		let controlId = `rdo_${keyName}_${state}`;
		let labelValue = state === 'true' ? modelValue.labelTrue : modelValue.labelFalse;
		let label = this.querySelector('#tmpl_control_radio').content.children[0].cloneNode(true);
		label.setAttribute('for', controlId);
		label.append(labelValue);

		let input = label.querySelector('input');
		input.name = keyName;
		input.id = controlId;
		input.value = state;
		if (modelValue.initial === state) {
			input.setAttribute('checked', 'checked');
		}

		return label;
	}

	createRadioControlGroup(keyName, modelValue) {
		if (modelValue.type === 'boolean') {
			let wrapper = this.querySelector('#tmpl_control_boolean').content.children[0].cloneNode(true);

			['true', 'false'].forEach((state) => {
				wrapper.appendChild(this.createRadioControl(keyName, modelValue, state));
			});

			return wrapper;
		}
	}

	associateWithFormControls() {
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
	}

	connectedCallback() {
		super.connectedCallback();
		this.associateWithFormControls();
	}
}

