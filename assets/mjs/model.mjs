export const MODEL = {
	position_x: {
		name: 'X Position',
		type: 'integer',
		formElement: 'range',
		initial: 50,
		min: 0,
		max: 100,
		affects: 'lander',
	},
	position_y: {
		name: 'Y Position',
		type: 'integer',
		formElement: 'range',
		initial: 60,
		min: 0,
		max: 120,
		affects: 'lander',
	},
	rotation: {
		name: 'Rotation',
		type: 'integer',
		formElement: 'range',
		initial: 0,
		min: -100,
		max: 100,
		affects: 'lander',
	},
	running: {
		name: 'Running',
		type: 'boolean',
		formElement: 'radio',
		initial: 'true',
		labelTrue: 'Running',
		labelFalse: 'Stopped',
		affects: 'game',
	},
	speed: {
		name: 'Speed',
		type: 'integer',
		formElement: 'range',
		initial: 50,
		min: 0,
		max: 100,
		affects: 'lander',
	},
	thruster: {
		name: 'Thruster',
		type: 'integer',
		formElement: 'range',
		initial: 0,
		min: 0,
		max: 100,
		affects: 'lander',
	},
};

export const KEYMAP = {
	'ArrowUp': {
		affects: 'thruster',
		change: 1,
		active: false,
	},
	'ArrowDown': {
		affects: 'thruster',
		change: -1,
		active: false,
	},
	'ArrowLeft': {
		affects: 'rotation',
		change: -1,
		active: false,
	},
	'ArrowRight': {
		affects: 'rotation',
		change: 1,
		active: false,
	},
};