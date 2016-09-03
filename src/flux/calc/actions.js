import * as types from './types';

export function buttonPress(payload) {
  return {
    type: types.BUTTON_PRESS,
    payload
  };
}

export function valueExceeded() {
  return {
    type: types.VALUE_EXCEEDED
  };
}

export function generateProblem() {
  return {
    type: types.GENERATE_PROBLEM
  };
}

export function correct() {
  return {
    type: types.CORRECT
  };
}
