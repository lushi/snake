const SnakeLine = require("./SnakeLine.js");

class SnakeGame {
  constructor(store) {
    this.store = store;
    this.line = new SnakeLine();
  }

  init() {
    let ctx = this._initCanvas();
    this._draw(ctx);
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

  _draw(ctx) {
    let state = this._getState();
    ctx.save();
    this._drawBorder(ctx, state);
    this.line.draw(ctx, state.line, state.TILE_SIZE);
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

  // convenience function, to save some typing
  _getState() {
    return this.store.getState();
  }
}

module.exports = SnakeGame;
