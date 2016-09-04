import React, { PropTypes } from 'react';

import STRING from 'services/language';
import Timer from 'components/timer';
import style from './style';

const StatusBar = ({ timeLeft, score }) => {
  console.log(STRING);
  return (
    <div className={ style.statusBar }>
      <div className={ style.timeLeft }>
        <Timer />
      </div>
      <div className={ style.score }>
        { `Score: ${score}` }
      </div>
      <div className={ style.settings }>
        { /* FIXME: Language service - Proxies are an unsupported feature: safari(iOS) 9.1 */}
        { STRING._currentLibrary.APP.SETTINGS }
      </div>
    </div>
  );
};

StatusBar.propTypes = {
  timeLeft: PropTypes.string,
  score: PropTypes.number
};

export default StatusBar;
