import React from 'react';
import { connect } from 'react-redux';
import style from './TimesheetButtons.module.scss';
import {
  timesheetHasChanges,
  timesheetHasAllRequiredFields
} from '../../utils/timesheets';
import {
  cancelTimesheetEdit,
  deleteTimesheet,
  saveTimesheets
} from '../../actions';

const TimesheetButtons = ({
  currentTimesheets,
  cachedTimesheets,
  employeeId,
  cancelTimesheetEdit,
  deleteTimesheet,
  saveTimesheets,
  timesheetIndex
}) => {
  const currentTimesheet = currentTimesheets[timesheetIndex];
  const cachedTimesheet = cachedTimesheets[timesheetIndex];
  const timesheetId = currentTimesheet.id;

  const saveButton =
    timesheetHasChanges(currentTimesheet, cachedTimesheet) &&
    timesheetHasAllRequiredFields(currentTimesheet) ? (
      <button
        className={style.default}
        onClick={() =>
          saveTimesheets(
            currentTimesheets,
            cachedTimesheets,
            timesheetIndex,
            employeeId
          )
        }
      >
        Save
      </button>
    ) : (
      <button className={style.inactive}>Save</button>
    );

  const cancelButton = timesheetHasChanges(
    currentTimesheet,
    cachedTimesheet
  ) ? (
    <button
      className={style.default}
      onClick={() => cancelTimesheetEdit(timesheetId, timesheetIndex)}
    >
      Cancel
    </button>
  ) : (
    <button className={style.inactive}>Cancel</button>
  );

  const deleteButton = (
    <button
      className={style.delete}
      onClick={() => deleteTimesheet(timesheetId, employeeId, timesheetIndex)}
    >
      Delete
    </button>
  );

  return (
    <div className={style.container}>
      {saveButton}
      {cancelButton}
      {deleteButton}
    </div>
  );
};

const mapStateToProps = state => ({
  currentTimesheets: state.timesheets.currentTimesheets,
  cachedTimesheets: state.timesheets.cachedTimesheets
});

const mapDispatchToProps = {
  cancelTimesheetEdit,
  deleteTimesheet,
  saveTimesheets
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimesheetButtons);
