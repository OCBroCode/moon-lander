import GameElement from './game-element.mjs';

export default class LanderVehicle extends GameElement {

	gameEngineElement = document.querySelector('game-engine');

	changeLanderProperties(event) {
		let changes = event.detail;

		Object.keys(changes).forEach((keyName) => {
			let newValue = changes[keyName];
			let propertyName = null;
			
			switch (keyName) {
				case 'rotation':
					propertyName = '--lander_rotation';
					break;
				case 'thruster':
					propertyName = '--lander_thruster';
					break;
			}

			if (propertyName) {
				let currentValue = parseInt(getComputedStyle(this.gameEngineElement).getPropertyValue(propertyName));
				this.gameEngineElement.style.setProperty(propertyName, currentValue += newValue);
			}
		});
	}

	connectedCallback() {
		super.connectedCallback();
		document.addEventListener('LanderStateChanged', this.changeLanderProperties.bind(this));
	}
}

