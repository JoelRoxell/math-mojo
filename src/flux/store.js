import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './reducers';

if (typeof window !== 'undefined' && window) {
  createStore(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f);
}

function configureStore() {
  let store;

  if (typeof window !== 'undefined' && window) {
    store = createStore(reducers, compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    );
  } else {
    store = createStore(reducers);
  }

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index.js');

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore();
