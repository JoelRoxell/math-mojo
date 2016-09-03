import React, { PropTypes } from 'react';

import style from './style';
import Button from 'components/button';

const ButtonPalette = ({ onClick }) => {
  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(number => {
    return (
      <Button
        key={ number }
        label={ number }
        onClick={ onClick.bind(this, number) } // eslint-disable-line
      />
    );
  });

  return (
    <div className={ style.buttonPalette }>
      { buttons }
    </div>
  );
};

ButtonPalette.propTypes = {
  onClick: PropTypes.func
};

export default ButtonPalette;
