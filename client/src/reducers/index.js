import { combineReducers } from 'redux';
import menus from './menus';
import menuItems from './menuItems';
import employees from './employees';
import timesheets from './timesheets';

const rootReducer = combineReducers({
  employees,
  menus,
  menuItems,
  timesheets
});

export default rootReducer;
