import Expresso from '../utils/Expresso';
import { sortItemNames } from '../utils/sort';
import { SET_EMPLOYEE_LIST } from '../actionTypes';

export const fetchEmployeeList = () => async dispatch => {
  const employees = await Expresso.getEmployeeList();
  const sortedEmployees = sortItemNames(employees, 'name');
  dispatch({ type: SET_EMPLOYEE_LIST, payload: sortedEmployees });
};
