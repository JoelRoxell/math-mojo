import React, { PropTypes } from 'react';

import Timer from 'components/timer';
import style from './style';

const StatusBar = ({ timeLeft, score }) => {
  return (
    <div className={ style.statusBar }>
      <div className={ style.timeLeft }>
        <Timer />
      </div>
      <div className={ style.score }>
        { `Score: ${score}` }
      </div>
      <div className={ style.settings }>
        { `Settings` }
      </div>
    </div>
  );
};

StatusBar.propTypes = {
  timeLeft: PropTypes.string,
  score: PropTypes.number
};

export default StatusBar;
