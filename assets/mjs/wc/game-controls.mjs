import GameElement from './game-element.mjs';
import { MODEL } from './../model.mjs';

export default class GameControls extends GameElement {
	#formElements = MODEL;

	createRangeControl(keyName, modelValue) {
		let controlId = `rng_${keyName}`;

		return `<div class="control">
			<label for="${ controlId }">${ modelValue.name }</label><br>
			<input type="range" min="${ modelValue.min }" max="${ modelValue.max }" id="${ controlId }" name="${ keyName }" value="${ modelValue.initial }">
			<output for="${ keyName }" name="result_${ keyName }"></output>
		</div>`;
	}

	createRadioControl(keyName, modelValue, state) {
		let controlId = `rdo_${keyName}_${state}`;
		let labelValue = state === 'true' ? modelValue.labelTrue : modelValue.labelFalse;

		return `<label for="${ controlId }">
			<input type="radio" name="${ keyName }" id="${ controlId }" value="${ state }" ${ (modelValue.initial === state) ? 'checked' : '' }>&nbsp;${ labelValue }
		</label>`;
	}

	createRadioControlGroup(keyName, modelValue) {
		let htmlString = '';
		
		if (modelValue.type === 'boolean') {
			htmlString = `<div class="control">
				${ this.createRadioControl(keyName, modelValue, 'true') }
				${ this.createRadioControl(keyName, modelValue, 'false') }
				<output for="${ keyName }" name="result_${ keyName }"></output>
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
		this.dispatchEvent(new Event('FormElementsAdded', {bubbles: true}));
	}

	connectedCallback() {
		super.connectedCallback();
		this.createFormControls();
	}
}

