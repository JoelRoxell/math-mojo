import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router,
  browserHistory,
  match
} from 'react-router';

import store from 'flux/store';
import exceedActor from 'flux/actors/exceed';

store.subscribe(function() {
  exceedActor(store.getState(), store.dispatch);
});

import routes from 'routes';
import config from '../config';

match({ history: browserHistory, routes }, (err, redirectLocation, renderProps) => {
  if (err) {
    console.log(err);

    return;
  }

  render(
    <Provider store={ store }>
      <Router { ...renderProps } />
    </Provider>
  , document.getElementById(config.MOUNTING_POINT));
});

if (module.hot) {
  module.hot.accept();
}
