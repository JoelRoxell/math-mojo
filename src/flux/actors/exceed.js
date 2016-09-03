import * as actions from '../calc/actions';

function exceed(state, dispatch) {
  const {
    sum,
    solution,
    sumLength,
    tries
  } = state.calc;

  if (sum === solution) {
    dispatch(actions.generateProblem());
    dispatch(actions.correct());
  } else if (sum > solution || tries >= sumLength) {
    dispatch(actions.valueExceeded());
  }
}

export default exceed;
