class SnakeLine {
  constructor() {}

  draw(ctx, state, tile_size) {
    ctx.save();

    let body = state.body;
    body.forEach((section) => {
      this._drawSection(ctx, section, tile_size);
    });

    ctx.restore();
  }

  _drawSection(ctx, section, tile_size) {
    // ctx saved and restored in parent this.draw() method
    ctx.fillStyle = "#000";
    ctx.fillRect(
      section.pos_x * tile_size,
      section.pos_y * tile_size,
      tile_size,
      tile_size
    );
  }
}

module.exports = SnakeLine;
