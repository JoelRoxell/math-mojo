// @flow
import React from 'react';
import { Switch, Route } from 'react-router'

import App from 'components/app';
import Calculator from 'components/calculator';

export default (
  <Switch>
    <Route path='/' component={ App }>
      <Route path='calculator' component={ Calculator } />
    </Route>
  </Switch>
);
