import GameElement from './game-element.mjs';

export default class GameInstruments extends GameElement {
	connectedCallback() {
		super.connectedCallback();
		this.dispatchEvent(new Event('InstrumentationAdded', { bubbles: true }));
	}
}

