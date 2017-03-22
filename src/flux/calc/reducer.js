import * as types from './types';

const initialState = {
  x: 5,
  y: 10,
  operator: '+',
  sum: 0,
  score: 0,
  sumLength: 0,
  tries: 0,
  solution: 0
};

function calc(state = initialState, action = {}) {
  switch (action.type) {
    case types.BUTTON_PRESS:
      { let newSum = parseInt(state.sum.toString() + action.payload.toString(), 10);

        return {
          ...state,
          sum: newSum,
          tries: ++state.tries
        };
      }

    case types.VALUE_EXCEEDED:
      return {
        ...state,
        sum: 0,
        tries: 0
      };

    case types.GENERATE_PROBLEM:
      { let x = Math.round((Math.random() * 100)),
        y = Math.round((Math.random() * 100));

        const solution = x + y;

        return {
          ...state,
          x,
          y,
          solution,
          sumLength: solution.toString().length,
          tries: 0,
          sum: 0
        };
      }

    case types.CORRECT:
      { const score = state.score += 10;

        return {
          ...state,
          score
        };
      }

    default:
      return state;
  }
}

export default calc;
