import React from 'react';
import style from './TimesheetButtons.module.scss';

const TimesheetButtons = ({
  timesheet,
  timesheetIndex,
  timesheetHasChanges,
  timesheetHasAllRequiredFields,
  saveTimesheet,
  cancelTimesheetEdit,
  deleteTimesheet
}) => {
  let saveButton, cancelButton, deleteButton;

    if (timesheetHasChanges(timesheet, timesheetIndex) && timesheetHasAllRequiredFields(timesheet)) {
      saveButton =<button className={style.default} onClick={() => saveTimesheet(timesheetIndex)}>Save</button>;
    } else {
      saveButton = <button className={style.inactive}>Save</button>;
    }

    if (timesheetHasChanges(timesheet, timesheetIndex)) {
      cancelButton =<button className={style.default} onClick={() => cancelTimesheetEdit(timesheetIndex)}>Cancel</button>
    } else {
      cancelButton = <button className={style.inactive}>Cancel</button>;
    }

    deleteButton = <button className={style.delete} onClick={() => deleteTimesheet(timesheetIndex)}>Delete</button>;

    return (
      <div className={style.container}>
        {saveButton}
        {cancelButton}
        {deleteButton}
      </div>
    );
}

export default TimesheetButtons;