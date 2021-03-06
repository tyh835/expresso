import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from './Timesheets.module.scss';
import TimesheetInfo from '../TimesheetInfo/TimesheetInfo';
import TimesheetButtons from '../TimesheetButtons/TimesheetButtons';

const Timesheets = ({ employeeId, timesheets }) => {
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
              />
              <TimesheetButtons
                employeeId={employeeId}
                timesheetIndex={timesheetIndex}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

Timesheets.propTypes = {
  employeeId: PropTypes.string.isRequired,
  timesheets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      hours: PropTypes.number,
      rate: PropTypes.number,
      date: PropTypes.number,
      employeeId: PropTypes.number,
      tempId: PropTypes.string
    })
  ).isRequired
};

const mapStateToProps = state => ({
  timesheets: state.timesheets.currentTimesheets
});

export default connect(mapStateToProps)(Timesheets);
