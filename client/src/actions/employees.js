import Expresso from '../utils/Expresso';
import { sortItemNames } from '../utils/sort';
import {
  ADD_EMPLOYEE,
  CANCEL_EMPLOYEE_EDIT,
  CLEAR_EMPLOYEE,
  DELETE_EMPLOYEE,
  SET_EMPLOYEE,
  SET_EMPLOYEE_LIST,
  UPDATE_EMPLOYEE
} from '../actionTypes';

export const cancelEmployeeEdit = () => ({
  type: CANCEL_EMPLOYEE_EDIT
});

export const clearEmployee = () => ({
  type: CLEAR_EMPLOYEE
});

export const deleteEmployee = (id, navigate) => async dispatch => {
  if (id) {
    const response = await Expresso.deleteEmployee(id);
    if (response.ok) {
      dispatch({ type: DELETE_EMPLOYEE, payload: id });
    }
  }
  dispatch({ type: CLEAR_EMPLOYEE });
  navigate('/');
};

export const fetchEmployee = id => async dispatch => {
  const employee = await Expresso.getEmployee(id);
  dispatch({ type: SET_EMPLOYEE, payload: employee });
};

export const fetchEmployeeList = () => async dispatch => {
  const employees = await Expresso.getEmployeeList();
  const sortedEmployees = sortItemNames(employees, 'name');
  dispatch({ type: SET_EMPLOYEE_LIST, payload: sortedEmployees });
};

export const restoreEmployee = employee => async dispatch => {
  const restoredEmployee = await Expresso.restoreEmployee(employee);
  dispatch({ type: SET_EMPLOYEE, payload: restoredEmployee });
  dispatch({ type: ADD_EMPLOYEE, payload: restoredEmployee });
};

export const saveEmployee = (employee, navigate) => async dispatch => {
  if (employee.id) {
    const updatedEmployee = await Expresso.updateEmployee(employee);
    dispatch({ type: SET_EMPLOYEE, payload: updatedEmployee });
  } else {
    const newEmployee = await Expresso.createEmployee(employee);
    dispatch({ type: SET_EMPLOYEE, payload: newEmployee });
    dispatch({ type: ADD_EMPLOYEE, payload: newEmployee });
    navigate(`/employees/${newEmployee.id}`);
  }
};

export const updateEmployee = e => {
  const type = e.target.id;
  const value = e.target.value;
  return {
    type: UPDATE_EMPLOYEE,
    payload: {
      type,
      value
    }
  };
};
