// @flow
import React, {
  Component
} from 'react';
import { Route } from 'react-router';

import Calculator from 'components/calculator';

import style from './app-style.styl';

class App extends Component {
  render() {
    return (
      <div className={ style.app }>
        <div className={ style.appView }>
          <Route path='/' component={ Calculator } />
        </div>
      </div>
    );
  }
}

export default App;
