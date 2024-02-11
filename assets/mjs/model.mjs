export const MODEL = {
    altitude: {
        name: 'Altitude',
        type: 'integer',
        formElement: 'range',
        initial: 100,
        min: 0,
        max: 120,
    },
    rotation: {
        name: 'Rotation',
        type: 'integer',
        formElement: 'range',
        initial: 0,
        min: -100,
        max: 100,
    },
    running: {
        name: 'Running',
        type: 'boolean',
        formElement: 'radio',
        initial: 'true',
				labelTrue: 'Running',
				labelFalse: 'Stopped'
    },
    speed: {
        name: 'Speed',
        type: 'integer',
        formElement: 'range',
        initial: 50,
        min: 0,
        max: 100,
    },
    thruster: {
        name: 'Thruster',
        type: 'integer',
        formElement: 'range',
        initial: 0,
        min: 0,
        max: 100,
    },
};