/* Based on Redux. Super simple API for updating and fetching
 * application state. Reasoning is to keep application state separate
 * from application logic.
*/
const createStore = (reducer, initialState={}) => {
  if (typeof reducer !== 'function') {
    throw new Error('reducer is expected to be a function.');
  }

  _state = initialState;

  return {
    getState: () => {
      return _state;
    },

    dispatch: (action) => {
      if (typeof action.type === 'undefined') {
        throw new Error('action must have type property.');
      }

      _state = reducer(_state, action);
    }
  };
}

module.exports = createStore;
