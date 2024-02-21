export const MODEL = {
	fuel: {
		name: 'Fuel',
		initial: 100,
		min: 0,
		max: 100,
		affects: 'lander',
	},
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

export const INDICATORS = {
	altitude_low: {
		name: 'Altitude low',
		initial: 0,
		min: 0,
		max: 1,
	},
	altitude_high: {
		name: 'Altitude high',
		initial: 0,
		min: 0,
		max: 1,
	},
	fuel_low: {
		name: 'Fuel low',
		initial: 0,
		min: 0,
		max: 1,
	},
	fuel_zero: {
		name: 'Fuel zero',
		initial: 0,
		min: 0,
		max: 1,
	},
	gear_down: {
		name: 'Gear down',
		initial: 0,
		min: 0,
		max: 1,
	},
	rotation_high: {
		name: 'Rotation high',
		initial: 0,
		min: 0,
		max: 1,
	},
	rotation_good: {
		name: 'Rotation nominal',
		initial: 1,
		min: 0,
		max: 1,
	},
	signal_lost: {
		name: 'Signal lost',
		initial: 0,
		min: 0,
		max: 1,
	},
	signal_weak: {
		name: 'Signal weak',
		initial: 0,
		min: 0,
		max: 1,
	},
}

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