import React from 'react';
import { connect } from 'react-redux';
import style from './TimesheetInfo.module.scss';
import { updateTimesheet } from '../../actions';

const TimesheetInfo = ({ timesheet, timesheetIndex, updateTimesheet }) => {
  const { date, hours, rate } = timesheet;

  return (
    <>
      <p className={style.strong}>Date: {new Date(date).toDateString()}</p>
      <p>
        Hours:{' '}
        <input
          onChange={e => updateTimesheet(e, timesheetIndex)}
          id="hours"
          value={hours}
          type="number"
        />
      </p>
      <p>
        Rate: $
        <input
          onChange={e => updateTimesheet(e, timesheetIndex)}
          id="rate"
          value={rate}
          type="number"
        />{' '}
        / hour
      </p>
      <p>Total: ${hours * rate}</p>
    </>
  );
};

const mapDispatchToProps = {
  updateTimesheet
};

export default connect(
  null,
  mapDispatchToProps
)(TimesheetInfo);
