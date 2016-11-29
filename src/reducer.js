const reducer = (state, action) => {
  switch (action.type) {
    case 'ADVANCE_LINE':
      let newBody = Object.assign([], state.line.body);
      let direction = state.line.direction;
      let head = Object.assign({}, newBody[0]);

      switch (direction) {
        case 'east':
          head.pos_x += 1;
          break;
        case 'west':
          head.pos_x -= 1;
          break;
        case 'north':
          head.pos_y -= 1;
          break;
        case 'south':
          head.pos_y += 1;
          break;
        default:
          throw new Error('not a valid direction');
      }

      newBody.unshift(head);
      newBody.pop();

      let newLine = Object.assign({}, state.line, {body: newBody});
      return Object.assign({}, state, {line: newLine});

    case 'SET_DIRECTION':
      let dir = action.data.direction;
      let lineState = state.line;
      let newLineState = Object.assign({}, lineState, { direction: dir });
      return Object.assign({}, state, {line: newLineState});
    default:
      return state;
  }
};

module.exports = reducer;
