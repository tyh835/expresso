import Expresso from '../utils/Expresso';
import { FETCH_EMPLOYEES } from '../actionTypes';

export const fetchEmployees = () => async dispatch => {
  const employees = await Expresso.getEmployees();

  if (employees.length) {
    const sortedEmployees = Expresso.sortItemNames(employees, 'name');
    dispatch({ type: FETCH_EMPLOYEES, payload: sortedEmployees });
  } else {
    dispatch({ type: FETCH_EMPLOYEES, payload: [] });
  }
};
