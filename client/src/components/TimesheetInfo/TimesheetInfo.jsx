import React from 'react';
import style from './TimesheetInfo.module.scss';

const TimesheetInfo = ({
  timesheet,
  timesheetIndex,
  updateTimesheet
}) => {
  return (
    <>
      <p className={style.strong}>Date: {new Date(timesheet.date).toDateString()}</p>
      <p>Hours: <input onChange={e => updateTimesheet(e, timesheetIndex)} id="hours" value={timesheet.hours} type="number" /></p>
      <p>Rate: $<input onChange={e => updateTimesheet(e, timesheetIndex)} id="rate" value={timesheet.rate} type="number" /> / hour</p>
      <p>Total: ${timesheet.hours * timesheet.rate}</p>
    </>
  )
};

export default TimesheetInfo;
