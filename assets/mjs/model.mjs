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
		initial: 90,
		min: 0,
		max: 100,
		affects: 'lander',
	},
	rotation: {
		name: 'Rotation',
		initial: 0,
		min: -90,
		max: 90,
		affects: 'lander',
	},
	running: {
		name: 'Running',
		initial: 'true',
		labelTrue: 'Running',
		labelFalse: 'Stopped',
		affects: 'game',
	},
	signal: {
		name: 'Signal',
		initial: 1,
		min: 0,
		max: 1,
		affects: 'lander',
	},
	speed: {
		name: 'Speed',
		initial: 0.1,
		min: -5,
		max: 5,
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
		change: -5,
		active: false,
	},
	'ArrowRight': {
		affects: 'rotation',
		change: 5,
		active: false,
	},
};

export const PARAMETERS = {
	gravity: 0.1,
}