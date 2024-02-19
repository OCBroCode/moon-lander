import GameElement from './game-element.mjs?date=2023-12-26';

export default class GameInstruments extends GameElement {
	connectedCallback() {
		super.connectedCallback();
		this.dispatchEvent(new Event('InstrumentationAdded', { bubbles: true }));
	}
}

