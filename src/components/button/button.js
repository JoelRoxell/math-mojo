// @flow
import React, { Component } from 'react';
import { Motion, spring, presets } from 'react-motion';

import classnames from 'utils/classnames';
import style from './style.styl';

/**
 * Calculator button which scales on tap and is used
 * in the button palette to create an answer.
 */
class Button extends Component {
  props: {
    onClick: () => void,
    label: [
      string,
      number
    ]
  };
  state: {
    scale: number
  }
  onClick: () => void

  /**
   * Sets the initial button scale.
   */
  constructor() {
    super();

    this.state = { scale: 1 };
    this.onClick = this.onClick.bind(this);
  }

  /**
   * Scales the button and triggers the onClick property function.
   */
  onClick() {
    this.setState({
      scale: 1.1
    });
    this.props.onClick();
  }

  /**
   * Renders the button component wrapped in Motion.
   * @return {ReactElement}
   */
  render() {
    const { label } = this.props;

    return (
      <Motion
        defaultStyle={ { z: 1 } }
        style={ { z: spring(this.state.scale, presets.stiff) } }
        onRest={ () => {
          window.requestAnimationFrame(() => {
            this.setState({ scale: 1 });
          });
        } }
      >
        { interpolatingStyle => {
          return (
            <div
              style={ {
                transform: `scale(${interpolatingStyle.z})`
              } }
              className={ classnames(style.button, {
                [style.active]: this.state.scale > 1
              }) }
              onClick={ this.onClick }
            >
              { label }
            </div>
          );
        } }
      </Motion>
    );
  }
}

export default Button;
