import GameElement from './game-element.mjs?date=2023-12-26';

export default class LanderVehicle extends GameElement {

	deployLandingGear(orderDeployment) {
		this.setAttribute('gear-mode', ( orderDeployment ) ? 'landing' : 'flight');
	}

	connectedCallback() {
		super.connectedCallback();
	}
}

