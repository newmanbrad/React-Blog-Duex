import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import layout from './layout';
import postList from './postList';

import auth from './auth';
// import {reducer as form} from 'redux-form';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  layout,
  postList,
  auth
});
