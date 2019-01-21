import {
  ADD_EMPLOYEE,
  CANCEL_EMPLOYEE_EDIT,
  CLEAR_EMPLOYEE,
  DELETE_EMPLOYEE,
  SET_EMPLOYEE,
  SET_EMPLOYEE_LIST,
  UPDATE_EMPLOYEE
} from '../actionTypes';

const initialState = {
  employeeList: [],
  currentEmployee: {
    isCurrentEmployee: 1,
    name: '',
    position: '',
    wage: 0
  },
  cachedEmployee: {
    isCurrentEmployee: 1,
    name: '',
    position: '',
    wage: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return {
        ...state,
        employeeList: [...state.employeeList, action.payload]
      };
    case CANCEL_EMPLOYEE_EDIT:
      return {
        ...state,
        currentEmployee: {
          ...state.cachedEmployee
        }
      };
    case CLEAR_EMPLOYEE:
      return {
        ...state,
        currentEmployee: {
          isCurrentEmployee: 1,
          name: '',
          position: '',
          wage: 0
        },
        cachedEmployee: {
          isCurrentEmployee: 1,
          name: '',
          position: '',
          wage: 0
        }
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employeeList: state.employeeList.filter(
          employee => employee.id !== action.payload
        )
      };
    case SET_EMPLOYEE:
      return {
        ...state,
        currentEmployee: action.payload,
        cachedEmployee: {
          ...action.payload
        }
      };
    case SET_EMPLOYEE_LIST:
      return {
        ...state,
        employeeList: action.payload
      };
    case UPDATE_EMPLOYEE:
      const { type, value } = action.payload;
      return {
        ...state,
        currentEmployee: {
          ...state.currentEmployee,
          [type]: value
        }
      };
    default:
      return state;
  }
};
