import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import session from './Session';
import users from './Users';
import groups from './Groups';
import modal from './Modal';
import search from './Search';
import fetching from './Fetching';

const appReducer = history => combineReducers({
  session,
  users,
  groups,
  modal,
  search,
  fetching,
  router: connectRouter(history)
});

const rootReducer = history => (state, action) => {
  if (action.type === types.LOGOUT_SUCCESS) {
    state = undefined;
  }

  return appReducer(history)(state, action)
};

export default rootReducer;
