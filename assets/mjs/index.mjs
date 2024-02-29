import GameEngine from './wc/game-engine.mjs?date=2023-12-26';
import GameSounds from './wc/game-sounds.mjs?date=2023-12-26';
import GameInstruments from './wc/game-instruments.mjs?date=2023-12-26';
import LanderVehicle from './wc/lander-vehicle.mjs?date=2023-12-26';

const customElementMappings = {
    'game-engine': GameEngine,
    'game-sounds': GameSounds,
    'game-instruments': GameInstruments,
    'lander-vehicle': LanderVehicle,
}

for (const [customElementName, customElementClass] of Object.entries(customElementMappings)) {
    window.customElements.define(customElementName, customElementClass);
}