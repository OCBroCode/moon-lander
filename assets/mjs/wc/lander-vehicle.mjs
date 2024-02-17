import GameElement from './game-element.mjs';

export default class LanderVehicle extends GameElement {

	gameEngineElement = document.querySelector('game-engine');

	changeLanderProperties(event) {
		let changes = event.detail;

		Object.keys(changes).forEach((keyName) => {
			let newValue = changes[keyName];
			let propertyName = `--lander_${keyName}`;
			let currentValue = parseFloat(getComputedStyle(this.gameEngineElement).getPropertyValue(propertyName));
			
			
			if (currentValue !== null || undefined) {
				this.gameEngineElement.style.setProperty(propertyName, currentValue + newValue);
			}
		});
	}

	connectedCallback() {
		super.connectedCallback();
		document.addEventListener('LanderStateChanged', this.changeLanderProperties.bind(this));
	}
}

