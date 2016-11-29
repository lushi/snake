class Snake {
  constructor(store) {
    this.store = store;
  }

  init() {
    let ctx = this._initCanvas();
  }

  _initCanvas() {
    const elId = 'snake-canvas';
    const state = this.store.getState();
    let canvas = window.document.getElementById(elId);
    if (!canvas) {
      canvas = window.document.createElement('div');
      canvas.setAttribute('id', elId);
      window.document.body.appendChild(canvas);
    }
    const width = state.WIDTH * state.TILE_SIZE;
    const height = state.HEIGHT * state.TILE_SIZE;
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    return canvas.getContext('2d');
  }
}

module.exports = Snake;
