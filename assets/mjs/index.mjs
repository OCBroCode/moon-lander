const dateFingerprint = '2023-12-15';

import GameControls from `./wc/game-controls.mjs?date=${dateFingerprint}`;
import GameScene from `./wc/game-scene.mjs?date=${dateFingerprint}`;
import LanderVehicle from `./wc/lander-vehicle.mjs?date=${dateFingerprint}`;

const customElementMappings = {
    'game-controls': GameControls,
    'game-scene': GameScene,
    'lander-vehicle': LanderVehicle,       
}

for (let customElementName, customElementClass in customElementMappings) {
    customElements.define(customElementName, customElementClass);
}