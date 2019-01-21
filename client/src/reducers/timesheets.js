import {
  ADD_TIMESHEET,
  CANCEL_TIMESHEET_EDIT,
  CLEAR_TIMESHEETS,
  DELETE_TIMESHEET,
  SAVE_TIMESHEETS,
  SET_TIMESHEETS,
  UPDATE_TIMESHEET
} from '../actionTypes';

const initialState = {
  currentTimesheets: [],
  cachedTimesheets: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TIMESHEET:
      return {
        ...state,
        currentTimesheets: [...state.currentTimesheets, action.payload],
        cachedTimesheets: [...state.cachedTimesheets, action.payload]
      };
    case CANCEL_TIMESHEET_EDIT:
      return {
        ...state,
        currentTimesheets: state.currentTimesheets.map((timesheet, i) => {
          return i === action.payload ? state.cachedTimesheets[i] : timesheet;
        })
      };
    case CLEAR_TIMESHEETS:
      return {
        ...state,
        currentTimesheets: [],
        cachedTimesheets: []
      };
    case DELETE_TIMESHEET:
      return {
        ...state,
        currentTimesheets: state.currentTimesheets.filter(
          (_, i) => i !== action.payload
        ),
        cachedTimesheets: state.cachedTimesheets.filter(
          (_, i) => i !== action.payload
        )
      };
    case SAVE_TIMESHEETS:
      return {
        ...state,
        currentTimesheets: action.payload.newTimesheets,
        cachedTimesheets: action.payload.newCachedTimesheets
      };
    case SET_TIMESHEETS:
      return {
        ...state,
        currentTimesheets: action.payload,
        cachedTimesheets: [...action.payload]
      };
    case UPDATE_TIMESHEET:
      const { type, value, timesheetIndex } = action.payload;
      return {
        ...state,
        currentTimesheets: state.currentTimesheets.map((timesheet, i) => {
          return i !== timesheetIndex
            ? timesheet
            : {
                ...timesheet,
                [type]: value
              };
        })
      };
    default:
      return state;
  }
};
