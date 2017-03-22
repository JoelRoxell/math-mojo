import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'components/app';
import Calculator from 'components/calculator';

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ Calculator } />

    <Route path='calculator' component={ Calculator } />
  </Route>
);
