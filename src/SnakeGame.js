const SnakeLine = require("./SnakeLine.js");
const SnakeFood = require("./SnakeFood.js");

class SnakeGame {
  constructor(store) {
    this.store = store;
    this.line = new SnakeLine();
    this.food = new SnakeFood();
  }

  init() {
    let ctx = this._initCanvas();
    this._bindEvents();
    this._loop(ctx);
  }

  _initCanvas() {
    const elId = 'snake-canvas';
    let canvas = window.document.getElementById(elId);
    if (!canvas) {
      canvas = window.document.createElement('canvas');
      canvas.setAttribute('id', elId);
      window.document.body.appendChild(canvas);
    }
    const state = this._getState();
    const width = state.WIDTH * state.TILE_SIZE;
    const height = state.HEIGHT * state.TILE_SIZE;
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    return canvas.getContext('2d');
  }

  _bindEvents() {
    window.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  _handleKeyDown(evt) {
    let key = evt.key;
    let direction = this._mapKeyToDirection(key);

    if (!direction) return false;

    if(this._isDirectionValid(this._getState().line.direction, direction)) {
      this.store.dispatch({
        type: 'SET_DIRECTION',
        data: {direction}
      })
    }
  }

  _mapKeyToDirection(key) {
    const map = {
      'ArrowLeft': 'west',
      'ArrowUp': 'north',
      'ArrowRight': 'east',
      'ArrowDown': 'south'
    };

    return map[key];
  }

  _isDirectionValid(prevDir, nextDir) {
    switch (prevDir) {
      case 'west': // fall through
      case 'east':
        return nextDir == 'north' || nextDir == 'south';
      case 'north':
      case 'south':
        return nextDir == 'east' || nextDir == 'west';
      default:
        throw new Error('prevDir is invalid.');
    }
  }

  _loop(ctx) {
      let then = Date.now();
      let state = this._getState();
      let interval = 1000/state.FPS;
      const width = state.WIDTH * state.TILE_SIZE;
      const height = state.WIDTH * state.TILE_SIZE;

      let now, dt;
      let _loop = () => {
        requestAnimationFrame(_loop);

        now = Date.now();
        dt = now - then;

        if (dt > interval) {
          then = now - (dt % interval);

          ctx.clearRect(0, 0, width, height);
          if (!this._gameOver()) {
            this._animate(ctx);
          }
        }
      }

      requestAnimationFrame(_loop);
  }

  _animate(ctx) {
    if (this._isLineOnFood()) {
      this.store.dispatch({type: 'GROW_LINE'});
    }
    this.store.dispatch({type: 'ADVANCE_LINE'})
    let state = this._getState();
    ctx.save();
    this._drawBorder(ctx, state);
    this.line.draw(ctx, state.line.body, state.TILE_SIZE);
    this.food.draw(ctx, state.food, state.TILE_SIZE);
    ctx.restore();
  }

  _drawBorder(ctx, state) {
    const tile_size = state.TILE_SIZE;
    const width = state.WIDTH * tile_size;
    const height = state.HEIGHT * tile_size;
    const offset = tile_size * (3/4); // offset is center of where line will be drawn

    ctx.save();
    ctx.lineWidth = tile_size / 2;
    ctx.rect(offset, offset, width - (offset * 2), height - (offset * 2));
    ctx.stroke();
    ctx.restore();
  }

  _gameOver() {
    return false;
  }


  _isLineOnFood() {
    let head = this._getState().line.body[0];
    let food = this._getState().food;

    return head.pos_x === food.pos_x && head.pos_y === food.pos_y;
  }

  // convenience function, to save some typing
  _getState() {
    return this.store.getState();
  }
}

module.exports = SnakeGame;
