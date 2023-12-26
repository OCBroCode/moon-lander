import GameControls from './wc/game-controls.mjs?date=2023-12-26';
import GameScene from './wc/game-scene.mjs?date=2023-12-26';
import LanderVehicle from './wc/lander-vehicle.mjs?date=2023-12-26';

const customElementMappings = {
    'game-controls': GameControls,
    'game-scene': GameScene,
    'lander-vehicle': LanderVehicle,       
}

for (const [customElementName, customElementClass] of Object.entries(customElementMappings)) {
    customElements.define(customElementName, customElementClass);
}