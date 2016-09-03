import * as types from './types';

const initalState = {
  time: 0
};

function timer(state = initalState, action = {}) {
  switch (action.type) {
    case types.TICK:
      return {
        ...state,
        time: ++state.time
      };

    default:
      return {
        ...state
      };
  }
}

export default timer;
