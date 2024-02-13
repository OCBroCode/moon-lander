import GameEngine from './wc/game-engine.mjs?date=2023-12-26';
import GameControls from './wc/game-controls.mjs?date=2023-12-26';
import LanderVehicle from './wc/lander-vehicle.mjs?date=2023-12-26';

const customElementMappings = {
    'game-engine': GameEngine,
    'game-controls': GameControls,
    'lander-vehicle': LanderVehicle,       
}

for (const [customElementName, customElementClass] of Object.entries(customElementMappings)) {
    window.customElements.define(customElementName, customElementClass);
}