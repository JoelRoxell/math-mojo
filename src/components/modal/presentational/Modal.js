import React, { Component, PropTypes } from 'react';

import style from './style';

class Modal extends Component {

  static propTypes = {
    componentName: PropTypes.string
  };

  static defaultProps = {
    componentName: 'Modal'
  }

  render() {
    return (
      <div className={ style.modal }>
        { this.props.componentName }
      </div>
    );
  }
}

export default Modal;
