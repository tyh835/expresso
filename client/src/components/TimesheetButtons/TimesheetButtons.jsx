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
  let saveButton, cancelButton, deleteButton;

  if (
    timesheetHasChanges(currentTimesheet, cachedTimesheet) &&
    timesheetHasAllRequiredFields(currentTimesheet)
  ) {
    saveButton = (
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
    );
  } else {
    saveButton = <button className={style.inactive}>Save</button>;
  }

  if (timesheetHasChanges(currentTimesheet, cachedTimesheet)) {
    cancelButton = (
      <button
        className={style.default}
        onClick={() => cancelTimesheetEdit(timesheetId, timesheetIndex)}
      >
        Cancel
      </button>
    );
  } else {
    cancelButton = <button className={style.inactive}>Cancel</button>;
  }

  deleteButton = (
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
