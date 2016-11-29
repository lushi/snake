const createStore = require("./createStore.js");
const reducer = require("./reducer.js");
const Snake = require("./Snake.js")

const initialState = {
  WIDTH: 20, // width of canvas, unit is TILE_SIZE
  HEIGHT: 20, // height of canvas, unit is TILE_SIZE
  TILE_SIZE: 20, // width/height of each tile, unit is px
  FPS: 8, // frames per second
  snake: {
    body: [
      {pos_x: 10, pos_y: 10}, // default starting position
      {pos_x: 9, pos_y: 10}
    ],
    direction: 'east' // default starting direction
  },
  food: {pos_x: 30, pos_y: 30} // default starting position
}

const store = createStore(reducer, initialState);
const snake = new Snake(store);
document.write(snake.init());
