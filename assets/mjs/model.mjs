export const MODEL = {
	position_x: {
		name: 'X Position',
		initial: 50,
		min: 0,
		max: 100,
		affects: 'lander',
	},
	position_y: {
		name: 'Y Position',
		initial: 60,
		min: 0,
		max: 100,
		affects: 'lander',
	},
	rotation: {
		name: 'Rotation',
		initial: 0,
		min: -100,
		max: 100,
		affects: 'lander',
	},
	running: {
		name: 'Running',
		initial: 'true',
		labelTrue: 'Running',
		labelFalse: 'Stopped',
		affects: 'game',
	},
	speed: {
		name: 'Speed',
		initial: 50,
		min: 0,
		max: 100,
		affects: 'lander',
	},
	thruster: {
		name: 'Thruster',
		initial: 0,
		min: 0,
		max: 100,
		affects: 'lander',
	},
};

export const KEYMAP = {
	'ArrowUp': {
		affects: 'thruster',
		change: 5,
		active: false,
	},
	'ArrowDown': {
		affects: 'thruster',
		change: -5,
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