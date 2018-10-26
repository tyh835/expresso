import React from 'react';
import TimesheetInfo from '../TimesheetInfo/TimesheetInfo.jsx';
import TimesheetButtons from '../TimesheetButtons/TimesheetButtons.jsx';
import style from './Timesheets.module.scss';

const Timesheets = ({
  timesheets,
  updateTimesheet,
  timesheetHasChanges,
  timesheetHasAllRequiredFields,
  saveTimesheet,
  cancelTimesheetEdit,
  deleteTimesheet
}) => {
  let newIndex = 0;
  return (
    <div>
      <h2 className={style.heading}>Timesheets</h2>
      <div className={style.container}>
        {
          timesheets.map((timesheet, timesheetIndex) => {
            return (
              <div className={style.timesheet} key={timesheet.id || `new${++newIndex}`}>
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
          })
        }
      </div>
    </div>
  )
};

export default Timesheets;