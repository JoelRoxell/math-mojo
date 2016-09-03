import React, {
  Component,
  PropTypes
} from 'react';

import STRING from 'services/language';
import style from './style/app';

class App extends Component {
  componentWillMount() {
    STRING.use(this);
  }

  render() {
    return (
      <div className={ style.app }>
        <div className={ style.appView }>
          { this.props.children }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default App;
