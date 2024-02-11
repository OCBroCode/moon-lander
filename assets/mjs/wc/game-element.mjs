export default class GameElement extends HTMLElement {
    connectedCallback() {
        console.log(`Custom element ${this.constructor.name} added to page.`);
    }

    disconnectedCallback() {
        console.log(`Custom element ${this.constructor.name} removed from page.`);
    }
}