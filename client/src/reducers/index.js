import { combineReducers } from 'redux';
import employees from './employees.js';
import menus from './menus.js';

const rootReducer = combineReducers({
  employees,
  menus
});

export default rootReducer;
