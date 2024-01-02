export const MODEL = {
    altitude: {
        type: 'integer',
        formElement: 'range',
        min: 0,
        max: 120,
    },
    rotation: {
        type: 'integer',
        formElement: 'range',
        min: -100,
        max: 100,
    },
    running: {
        type: 'boolean',
        formElement: 'radio',
    },
    speed: {
        type: 'integer',
        formElement: 'range',
        min: 0,
        max: 100,
    },
    thruster: {
        type: 'integer',
        formElement: 'range',
        min: 0,
        max: 100,
    },
};