import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import ResultLabel from 'components/result-label';
import { ButtonPaletteContainer } from 'components/button-palette';
import StatusBar from 'components/status-bar';
import { generateProblem } from 'flux/calc/actions';
import style from './style.styl';

class Calculator extends Component {
  componentWillMount() {
    this.props.dispatch(generateProblem());
  }

  render() {
    const { x, y, operator, score, sum } = this.props;

    return (
      <div className={ style.calculator }>
        <ResultLabel
          x={ x }
          y={ y }
          operator={ operator }
          sum={ sum }
        />
        <ButtonPaletteContainer />
        <StatusBar score={ score } />
      </div>
    );
  }
}

Calculator.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  operator: PropTypes.string,
  score: PropTypes.number,
  sum: PropTypes.number,
  dispatch: PropTypes.func
};

export default connect(state => {
  const {
    x,
    y,
    operator,
    sum,
    score
  } = state.calc;

  return {
    x,
    y,
    operator,
    sum,
    score
  };
})(Calculator);
