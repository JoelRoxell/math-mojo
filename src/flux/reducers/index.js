import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import app from '../app';
import auth from '../auth';
import calc from '../calc';
import timer from '../timer';

export default combineReducers({
  app,
  form,
  auth,
  calc,
  timer
});
