import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './Employee.module.scss';
import EmployeeInfo from '../EmployeeInfo/EmployeeInfo';
import EmployeeButtons from '../EmployeeButtons/EmployeeButtons';
import Timesheets from '../Timesheets/Timesheets';
import {
  addTimesheet,
  clearEmployee,
  fetchEmployee,
  fetchTimesheets
} from '../../actions';

class Employee extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id === 'new') {
      return this.props.clearEmployee();
    } else {
      this.props.fetchEmployee(id);
      this.props.fetchTimesheets(id);
    }
  }

  render() {
    const { addTimesheet, employee } = this.props;
    const navigate = this.props.history.push;
    const employeeId = this.props.match.params.id;

    return (
      <div className={style.container}>
        <h2 className={style.heading}>Employee</h2>
        <div className={style.employeeInfo}>
          <EmployeeInfo />
          <EmployeeButtons navigate={navigate} />
        </div>
        {employeeId === 'new' || <Timesheets employeeId={employeeId} />}
        <button
          className={style.addButton}
          onClick={() => addTimesheet(employeeId, employee.wage)}
        >
          Add Timesheet
        </button>
      </div>
    );
  }
}

Employee.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    position: PropTypes.string,
    wage: PropTypes.number,
    isCurrentEmployee: PropTypes.number
  }).isRequired,
  addTimesheet: PropTypes.func.isRequired,
  clearEmployee: PropTypes.func.isRequired,
  fetchEmployee: PropTypes.func.isRequired,
  fetchTimesheets: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  employee: state.employees.currentEmployee
});

const mapDispatchToProps = {
  addTimesheet,
  clearEmployee,
  fetchEmployee,
  fetchTimesheets
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Employee));
