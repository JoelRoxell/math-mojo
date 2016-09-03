import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  hashHistory,
  IndexRoute
} from 'react-router';

import font from 'styles/global/fonts'; // eslint-disable-line

import App from 'components/app';
/* Currently routes can't be imported correctly,
 * e.g. about-route type becomes undefined on import and prevents rendering in router tree.
 * TODO: Evaluate a solution and/or find the issue created with es6 import.
 */
import Calculator from 'components/calculator';
import store from 'flux/store';
import exceedActor from 'flux/actors/exceed';

store.subscribe(function() {
  exceedActor(store.getState(), store.dispatch);
});

render((
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path='/' component={ App }>
        <IndexRoute component={ Calculator } />
        <Route path='calculator' component={ Calculator } />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
