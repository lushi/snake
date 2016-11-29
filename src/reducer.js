const reducer = (state, action) => {
  let direction = state.line.direction;
  let lineState = state.line;
  switch (action.type) {
    case 'ADVANCE_LINE':
      let newBody = Object.assign([], lineState.body);
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

      if (!lineState.growLine) {
        newBody.pop();
      }

      return Object.assign({}, state, {
        line: Object.assign({}, lineState, {body: newBody, growLine: false})
      });

    case 'SET_DIRECTION':
      let newLineState = Object.assign({}, state.line, { direction: action.data.direction });
      return Object.assign({}, state, {line: newLineState});

    case 'GROW_LINE':
      return Object.assign({}, state, {
        line: Object.assign({}, state.line, { growLine: true })
      })
    default:
      return state;
  }
};

module.exports = reducer;
