export const MODEL = {
	position_y: {
		name: 'Y Position',
		type: 'integer',
		formElement: 'range',
		initial: 100,
		min: 0,
		max: 120,
		affects: 'lander',
		eventName: 'LanderStateChanged',
	},
	position_x: {
		name: 'X Position',
		type: 'integer',
		formElement: 'range',
		initial: 50,
		min: 0,
		max: 100,
		affects: 'lander',
		eventName: 'LanderStateChanged',
	},
	rotation: {
		name: 'Rotation',
		type: 'integer',
		formElement: 'range',
		initial: 0,
		min: -100,
		max: 100,
		affects: 'lander',
		eventName: 'LanderStateChanged',
	},
	running: {
		name: 'Running',
		type: 'boolean',
		formElement: 'radio',
		initial: 'true',
		labelTrue: 'Running',
		labelFalse: 'Stopped',
		affects: 'game',
		eventName: 'GameStateChanged',
	},
	speed: {
		name: 'Speed',
		type: 'integer',
		formElement: 'range',
		initial: 50,
		min: 0,
		max: 100,
		affects: 'lander',
		eventName: 'LanderStateChanged',
	},
	thruster: {
		name: 'Thruster',
		type: 'integer',
		formElement: 'range',
		initial: 0,
		min: 0,
		max: 100,
		affects: 'lander',
		eventName: 'LanderStateChanged',
	},
};