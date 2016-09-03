import React, { PropTypes } from 'react';

import style from './style';

const ResultLabel = ({ x, y, operator, sum }) => {
  return (
    <div className={ style.resultLabel }>
      { `${x} ${operator} ${y}  = ${sum || '?'}` }
    </div>
  );
};

ResultLabel.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  sum: PropTypes.number,
  operator: PropTypes.string
};

export default ResultLabel;
