class SnakeFood {
  constructor() {}

  draw(ctx, state, tile_size) {
    ctx.save();
    ctx.fillStyle = "#000";
    ctx.fillRect(
      state.pos_x * tile_size,
      state.pos_y * tile_size,
      tile_size,
      tile_size
    );
    ctx.restore();
  }
}

module.exports = SnakeFood;
