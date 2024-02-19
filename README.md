# Moon Lander!

I'm fascinated by the prospect of a little lander working its way to the surface of an alien world.

This project is a Web-based (and overly) simple simulation of a craft trying to successfully softly land on the surface of a moon or planet.
I wanted to use this project as a vehicle for learning more about Web Components, ES Modules, Event-based communication, and using PWA technologies.

[Check out the work in progress at `ndorfin.github.io/moon-lander`](https://ndorfin.github.io/moon-lander/)

## Design considerations

### Event Loop

Runs at a set frequency

Each interval:

1. **Simple** (1-dimensional)

	Ignore rotation and X-axis movement. The lander is flying straight down with no lateral movement.

	- Get current Y position
	- Get current speed
	- Get current thruster amount
	- Apply gravity
	- Take speed and divide by interval to get new distance
	- Set new current Y position

2. **More complex** (2-dimensional)

	Now mix in the lander's rotation, current vector. The user needs to thrust against their vector, while still maintaining the desired altitude.

	- Get current X and Y position
	- Get current speed and direction (vector)
	- Apply gravity to vector

- If Lander is out of bounds, end the game.
- If Lander is still in bounds, continue.

### End game

- Stop the event loop
- Remove handlers and clean up.
- Show end screen
	- Display time spent
	- Display success/fail message

## Architecture

### Component tree

- Game Engine
	- Intro screen
	- Game Controls (and instrumentation)
	- Lander Vehicle
		- Vehicle Booster
	- Planet surface
	- Success / Fail screen

#### Game Engine

Keyboard and other input capturing is done by the Game Engine. 

#### Game Controls (and instrumentation)

This component first renders all the controls that match the given model of metrics to display.

## Further ideas

- The user's phone x-axis motion to control lander rotation
- Thumb press on the booster button to add thrust
- Deploy landing legs when near landing, or the user must deploy them at the right speed and altitude.
- Navigate craters, hills, and boulders
- Massive lateral speed
- Rapid orbits can affect day/night cycling
- Use a parallax or exponentially scaled background, so that the terrain rushes up to the lander as it approaches.
- Use a fixed fuel-tank, too much thrusting = running out of fuel quicker.
- Explore multiple planets, with different environments:
  - Gravity changes
  - Atmospheres / Wind
  - Landing in liquids
  - Dealing with foreign objects / fauna

## Questions

- `requestAnimationFrame()` and smooth intervals vs. fixed intervals.
- batching changes to the lander per interval - current design only supports one change per interval.