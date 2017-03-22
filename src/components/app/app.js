// @flow
import React, {
  Component,
  PropTypes
} from 'react';

import style from './app-style.styl';

class App extends Component {
  render() {
    return (
      <div className={ style.app }>
        <div className={ style.appView }>
          { this.props.children }
        </div>

        <div className={ style.modal }>
          Bottom modal
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default App;
