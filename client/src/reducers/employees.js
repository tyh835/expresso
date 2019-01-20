import { FETCH_EMPLOYEES } from '../actionTypes';

const initialState = {
  employeeList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return {
        ...state,
        employeeList: action.payload
      };
    default:
      return state;
  }
};
