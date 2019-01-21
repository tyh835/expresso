import { SET_EMPLOYEE_LIST } from '../actionTypes';

const initialState = {
  employeeList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EMPLOYEE_LIST:
      return {
        ...state,
        employeeList: action.payload
      };
    default:
      return state;
  }
};
