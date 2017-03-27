import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'

import App from 'components/app';

import store from 'flux/store';
import exceedActor from 'flux/actors/exceed';

store.subscribe(function() {
  exceedActor(store.getState(), store.dispatch);
});

// import routes from 'routes';
import config from '../config';

render(
  <Provider store={ store }>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementsByClassName(config.MOUNTING_POINT)[0]
);

if (module.hot) {
  module.hot.accept();
}
