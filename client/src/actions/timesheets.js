import uuid from 'uuid/v4';
import Expresso from '../utils/Expresso';
import { sortTimesheets } from '../utils/sort';
import {
  ADD_TIMESHEET,
  CANCEL_TIMESHEET_EDIT,
  CLEAR_TIMESHEETS,
  DELETE_TIMESHEET,
  NULL_ACTION,
  SAVE_TIMESHEETS,
  SET_TIMESHEETS,
  UPDATE_TIMESHEET
} from '../actionTypes';

export const addTimesheet = (id, wage) => {
  if (id === 'new') return { type: NULL_ACTION };
  const newTimesheet = {
    hours: 0,
    rate: wage,
    date: Date.now(),
    tempId: uuid()
  };

  return {
    type: ADD_TIMESHEET,
    payload: newTimesheet
  };
};

export const cancelTimesheetEdit = (id, timesheetIndex) => {
  if (!id) {
    return {
      type: DELETE_TIMESHEET,
      payload: timesheetIndex
    };
  } else {
    return {
      type: CANCEL_TIMESHEET_EDIT,
      payload: timesheetIndex
    };
  }
};

export const clearTimesheets = () => ({
  type: CLEAR_TIMESHEETS
});

export const deleteTimesheet = (
  id,
  employeeId,
  timesheetIndex
) => async dispatch => {
  if (!id) return dispatch({ type: DELETE_TIMESHEET, payload: timesheetIndex });

  const response = await Expresso.deleteTimesheet(id, employeeId);
  if (response.ok) {
    dispatch({ type: DELETE_TIMESHEET, payload: timesheetIndex });
  }
};

export const fetchTimesheets = employeeId => async dispatch => {
  const timesheets = await Expresso.getTimesheets(employeeId);
  const sortedTimesheets = sortTimesheets(timesheets);
  dispatch({ type: SET_TIMESHEETS, payload: sortedTimesheets });
};

export const saveTimesheets = (
  currentTimesheets,
  cachedTimesheets,
  timesheetIndex,
  employeeId
) => async dispatch => {
  const savedTimesheet = currentTimesheets[timesheetIndex];
  let newTimesheet;

  if (savedTimesheet.id) {
    newTimesheet = await Expresso.updateTimesheet(savedTimesheet, employeeId);
  } else {
    newTimesheet = await Expresso.createTimesheet(savedTimesheet, employeeId);
  }

  let newTimesheets = currentTimesheets.map((timesheet, i) =>
    i === timesheetIndex ? newTimesheet : timesheet
  );
  let newCachedTimesheets = cachedTimesheets.map((timesheet, i) =>
    i === timesheetIndex ? newTimesheet : timesheet
  );
  newTimesheets = sortTimesheets(newTimesheets);
  newCachedTimesheets = sortTimesheets(newCachedTimesheets);

  dispatch({
    type: SAVE_TIMESHEETS,
    payload: {
      newTimesheets,
      newCachedTimesheets
    }
  });
};

export const updateTimesheet = (e, timesheetIndex) => {
  const type = e.target.id;
  const value = e.target.value;
  return {
    type: UPDATE_TIMESHEET,
    payload: {
      type,
      value,
      timesheetIndex
    }
  };
};
