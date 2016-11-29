# snake
The class game of Snake built using HTML &lt;canvas>.

## Overview
Main game logic is encapsulated in `SnakeGame()`. The constructor takes a reference to the data store (more on that below). The game is kicked off by the `init()` method:
~~~~
  const SnakeGame = require ("./SnakeGame.js");
  let game = new SnakeGame();
  game.init();
~~~~

There are two other classes, `SnakeLine()`, which handles drawing of the line, and `SnakeFood()`, which handles drawing of the "food". Each class should have no internal state and is designed to only handle presentation. Each has a `draw()` method.

The game state is decoupled from the game logic and is stored in the store. I wrote a data store creator that's a much simplified version of Redux. Much like Redux, the data store is created by passing in a reducer function to `createStore()`. The API is limited to `dispatch()` and `getState()`. This supports unidirectional flow of data and allows reducers to be defined separately.

The way the animation works is that `init()` kicks off a (currently infinite) game loop. Depending on the key frame rate per second, as defined in the game state, something might happen during a given game loop, or it might not. If the interval between the current game loop and the previous one is sufficient, the canvas is wiped clear, action(s) is dispatched to advance the line (and grow the line if it meets food), and then the game state is fetched and redrawn.

In addition, `init()` also binds a listener for 'keydown' event onto `window`. If the key is valid, an action is dispatched to the store to change the direction of the line. The line advances in the new direction on the next active game loop.

## How to run
1. Git clone the repository
2. `$ npm install`
3. `$ npm start`. That will compile the js files into /bundle.js, and start a simple Python server
4. Open Chrome and navigate to http://localhost:8000/

## Todo's
I spent a good chunk of time planning out and and implementing the overral structure of the app, and ran out of time implementing all the features and adding styling. Here's a list of todos:

* __random placement of food after being eaten__. The game logic should include generation of a random set of coordinates for the food within the canvas. This code should also check that the coodinates is not within the array of coodinates occupied by the line. The coordinates can then be passed to the `draw()` method in `SnakeFood()`. Currently the food placement is static, although the line does advance if it meets the food.

* __collision detection__. During each active game loop, a method call should check whether the line has collided with the border or itself, thus ending the game. This simply means checking if the head (i.e. first element in the line body) has the same x or y coordinate as the canvas borders (for border collision) and if the head has the same coordinates as any other element in the line body (for self collision). Currently, the line is allowed to advance off the board.

* __game over state__. If the game is over, the game loop should be stopped, a game over message is displayed, and the player is possibly given the option to restart game. (It would be neat to allow the player to enter their name and score in a leaderboard, which could stored in localStorage or other persistant data store.)

* __score tracking__. The game currently lacks score keeping. Traditionally, the score is incremented every time the line meets the food. This can be easily achieved by keeping track of the score as part of the game state, and dispatching an action to increment the score when line meets food.
..* An alternative idea that might be cool is to set a string in the game state (say, "I ♥ Squarespace!"). Each time the food is placed, it contains a character from the string, starting from the end and precending up. When the line meets the food, it "eats" the food and grows a tile that contains the character. Thus for the example given above, the line will begin with empty spaces, at one stage become "respace!  ", and eventually the game ends when the player gets the whole string. The measure of how well the player did can be the time to completion. This should also not be too difficult to implement because of how decoupled the game state, game logic, and game presentation are from each other.

* __styling__. I had some cool ideas and am disappointed not to have time to add styling to the game :(

* __refactoring and unit testing__. The game logic in `SnakeGame()` can potentially be furthered refactored and abstracted into a module that's separate from the event handling and other particulars of the game in a browser context. This would allow the game logic by itself to be unit tested. In addition, the currently single large reducer can be divided into smaller chunks, and each should also be unit tested. Currently, only `createStore()` has unit tests, which can be run in the command line with `$ npm test`. 
