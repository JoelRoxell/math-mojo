import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { tick } from 'flux/timer/actions';
import style from './style.styl';

class Timer extends Component {
  componentDidMount() {
    this.timerId = setInterval(() => {
      this.props.tick();
    }, 1000);
  }

  format(number = 0) {
    let numberFormat = number.toString();

    return (numberFormat.length < 2) ? `0${numberFormat}` : numberFormat;
  }

  render() {
    let minutes = Math.floor(this.props.time / 60);
    let seconds = this.props.time % 60;

    return (
      <div className={ style.timer }>
        { `${this.format(minutes)} : ${this.format(seconds)}` }
      </div>
    );
  }
}

Timer.propTypes = {
  time: PropTypes.number,
  tick: PropTypes.func
};

export default connect(state => {
  return {
    time: state.timer.time
  };
}, dispatch => {
  return {
    tick() {
      dispatch(tick());
    }
  };
})(Timer);
