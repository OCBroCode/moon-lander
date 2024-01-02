import GameElement from './game-element.mjs';
import { MODEL } from './../model.mjs';

export default class GameControls extends GameElement {
    #formElements = MODEL;

    connectedCallback() {
        super.connectedCallback();
        console.log('MODEL', MODEL);
        console.log(Object.entries(this.#formElements));
    }
}

