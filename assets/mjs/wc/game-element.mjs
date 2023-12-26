export default class GameElement extends HTMLElement {

    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        console.log(`Custom element ${this.constructor.name} added to page.`);
    }

    disconnectedCallback() {
        console.log(`Custom element ${this.constructor.name} removed from page.`);
    }
}