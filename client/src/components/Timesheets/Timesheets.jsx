import React from 'react';
import style from './Timesheets.module.scss';
import TimesheetInfo from '../TimesheetInfo/TimesheetInfo';
import TimesheetButtons from '../TimesheetButtons/TimesheetButtons';

const Timesheets = ({
  timesheets,
  updateTimesheet,
  timesheetHasChanges,
  timesheetHasAllRequiredFields,
  saveTimesheet,
  cancelTimesheetEdit,
  deleteTimesheet
}) => {
  return (
    <div>
      <h2 className={style.heading}>Timesheets</h2>
      <div className={style.container}>
        {timesheets.map((timesheet, timesheetIndex) => {
          return (
            <div
              className={style.timesheet}
              key={timesheet.id || timesheet.tempId}
            >
              <TimesheetInfo
                timesheet={timesheet}
                timesheetIndex={timesheetIndex}
                updateTimesheet={updateTimesheet}
              />
              <TimesheetButtons
                timesheet={timesheet}
                timesheetIndex={timesheetIndex}
                timesheetHasChanges={timesheetHasChanges}
                timesheetHasAllRequiredFields={timesheetHasAllRequiredFields}
                saveTimesheet={saveTimesheet}
                cancelTimesheetEdit={cancelTimesheetEdit}
                deleteTimesheet={deleteTimesheet}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timesheets;
