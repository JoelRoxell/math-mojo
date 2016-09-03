import React, { PropTypes } from 'react';

import style from './style';

const Button = ({ onClick, label }) => {
  return (
    <div
      className={ style.button }
      onClick={ onClick }>
      { label }
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default Button;
