import Expresso from '../utils/Expresso';
import { FETCH_EMPLOYEE_LIST } from '../actionTypes';

export const fetchEmployeeList = () => async dispatch => {
  const employees = await Expresso.getEmployeeList();

  if (employees.length) {
    const sortedEmployees = Expresso.sortItemNames(employees, 'name');
    dispatch({ type: FETCH_EMPLOYEE_LIST, payload: sortedEmployees });
  } else {
    dispatch({ type: FETCH_EMPLOYEE_LIST, payload: [] });
  }
};
