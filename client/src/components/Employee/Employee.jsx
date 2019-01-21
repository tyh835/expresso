import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid/v4';
import style from './Employee.module.scss';
import EmployeeInfo from '../EmployeeInfo/EmployeeInfo';
import EmployeeButtons from '../EmployeeButtons/EmployeeButtons';
import Timesheets from '../Timesheets/Timesheets';
import Expresso from '../../utils/Expresso';
import { sortTimesheets } from '../../utils/sort';
import { clearEmployee, fetchEmployee } from '../../actions';

class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timesheets: [],
      savedTimesheets: []
    };

    this.updateTimesheet = this.updateTimesheet.bind(this);
    this.addTimesheet = this.addTimesheet.bind(this);
    this.saveTimesheet = this.saveTimesheet.bind(this);
    this.cancelTimesheetEdit = this.cancelTimesheetEdit.bind(this);
    this.deleteTimesheet = this.deleteTimesheet.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id === 'new') {
      return this.props.clearEmployee();
    } else {
      this.props.fetchEmployee(id);
    }

    Expresso.getTimesheets(this.props.match.params.id).then(timesheets => {
      const sortedTimesheets = sortTimesheets(timesheets);
      this.setState({
        timesheets: sortedTimesheets,
        savedTimesheets: [...sortedTimesheets]
      });
    });
  }

  updateTimesheet(e, timesheetIndex) {
    const type = e.target.id;
    const newValue = e.target.value;
    this.setState(state => {
      state.timesheets[timesheetIndex] = {
        ...state.timesheets[timesheetIndex],
        [type]: newValue
      };
      return {
        ...state,
        timesheets: state.timesheets
      };
    });
  }

  addTimesheet() {
    if (this.props.match.params.id === 'new') return;

    const newtimesheet = {
      hours: 0,
      rate: this.state.employee.wage,
      date: Date.now(),
      employeeId: this.state.employee.id,
      tempId: uuid()
    };

    this.setState(state => {
      return {
        ...state,
        timesheets: [newtimesheet, ...state.timesheets],
        savedTimesheets: [newtimesheet, ...state.savedTimesheets]
      };
    });
  }

  saveTimesheet(timesheetIndex) {
    if (this.state.timesheets[timesheetIndex].id) {
      Expresso.updateTimesheet(
        this.state.timesheets[timesheetIndex],
        this.state.employee.id
      ).then(newTimesheet => {
        let timesheets = this.state.timesheets.map((timesheet, i) =>
          i === timesheetIndex ? newTimesheet : timesheet
        );
        timesheets = sortTimesheets(timesheets);
        this.setState({
          timesheets,
          savedTimesheets: [...timesheets]
        });
      });
    } else {
      Expresso.createTimesheet(
        this.state.timesheets[timesheetIndex],
        this.state.employee.id
      ).then(newTimesheet => {
        let timesheets = this.state.timesheets.map((timesheet, i) =>
          i === timesheetIndex ? newTimesheet : timesheet
        );
        let savedTimesheets = this.state.savedTimesheets.map((timesheet, i) =>
          i === timesheetIndex ? newTimesheet : timesheet
        );
        timesheets = sortTimesheets(timesheets);
        savedTimesheets = sortTimesheets(savedTimesheets);
        this.setState({
          timesheets,
          savedTimesheets
        });
      });
    }
  }

  cancelTimesheetEdit(timesheetIndex) {
    const timesheet = this.state.timesheets[timesheetIndex];
    if (!timesheet.id) {
      this.deleteTimesheet(timesheetIndex);
    } else {
      this.setState(state => {
        return {
          timesheets: state.timesheets.map((timesheet, i) => {
            return i === timesheetIndex ? state.savedTimesheets[i] : timesheet;
          })
        };
      });
    }
  }

  deleteTimesheet(timesheetIndex) {
    const timesheet = this.state.timesheets[timesheetIndex];
    if (!timesheet.id) {
      this.setState(state => {
        return {
          timesheets: state.timesheets.filter((_, i) => i !== timesheetIndex),
          savedTimesheets: state.savedTimesheets.filter(
            (_, i) => i !== timesheetIndex
          )
        };
      });
    } else {
      Expresso.deleteTimesheet(timesheet.id, this.state.employee.id).then(
        () => {
          this.setState(state => {
            return {
              timesheets: state.timesheets.filter(
                (_, i) => i !== timesheetIndex
              ),
              savedTimesheets: state.savedTimesheets.filter(
                (_, i) => i !== timesheetIndex
              )
            };
          });
        }
      );
    }
  }

  render() {
    const navigate = this.props.history.push;
    const employeeId = this.props.match.params.id;

    return (
      <div className={style.container}>
        <h2 className={style.heading}>Employee</h2>
        <div className={style.employeeInfo}>
          <EmployeeInfo />
          <EmployeeButtons navigate={navigate} />
        </div>
        {true || ( // used to be this.props.match.params.id === 'new'
          <Timesheets
            timesheets={this.state.timesheets}
            updateTimesheet={this.updateTimesheet}
            saveTimesheet={this.saveTimesheet}
            cancelTimesheetEdit={this.cancelTimesheetEdit}
            deleteTimesheet={this.deleteTimesheet}
          />
        )}
        <button className={style.addButton} onClick={this.addTimesheet}>
          Add Timesheet
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentEmployee: state.employees.currentEmployee
});

const mapDispatchToProps = {
  clearEmployee,
  fetchEmployee
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Employee));
