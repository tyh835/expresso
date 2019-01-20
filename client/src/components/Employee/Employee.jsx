import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid/v4';
import style from './Employee.module.scss';

import EmployeeInfo from '../EmployeeInfo/EmployeeInfo.jsx';
import EmployeeButtons from '../EmployeeButtons/EmployeeButtons.jsx';
import Timesheets from '../Timesheets/Timesheets.jsx';
import Expresso from '../../utils/Expresso';

class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: null,
      timesheets: [],
      savedTimesheet: {},
      savedTimesheets: [],
      savedEmployee: {}
    };

    this.updateEmployee = this.updateEmployee.bind(this);
    this.updateTimesheet = this.updateTimesheet.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.cancelEmployeeEdit = this.cancelEmployeeEdit.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.restoreEmployee = this.restoreEmployee.bind(this);
    this.employeeHasChanges = this.employeeHasChanges.bind(this);
    this.employeeHasAllRequiredFields = this.employeeHasAllRequiredFields.bind(
      this
    );
    this.addTimesheet = this.addTimesheet.bind(this);
    this.saveTimesheet = this.saveTimesheet.bind(this);
    this.cancelTimesheetEdit = this.cancelTimesheetEdit.bind(this);
    this.deleteTimesheet = this.deleteTimesheet.bind(this);
    this.timesheetHasChanges = this.timesheetHasChanges.bind(this);
    this.timesheetHasAllRequiredFields = this.timesheetHasAllRequiredFields.bind(
      this
    );
  }

  componentDidMount() {
    if (this.props.match.params.id === 'new') {
      const newEmployee = {
        name: '',
        position: '',
        wage: 0,
        isCurrentEmployee: 1
      };

      this.setState({
        employee: newEmployee,
        savedEmployee: {
          ...newEmployee
        }
      });
      return;
    }

    Expresso.getEmployee(this.props.match.params.id).then(employee => {
      if (employee) {
        this.setState({
          employee: employee,
          savedEmployee: {
            ...employee
          }
        });
      }
    });

    Expresso.getTimesheets(this.props.match.params.id).then(timesheets => {
      const sortedTimesheets = this.sortTimesheets(timesheets);
      this.setState({
        timesheets: sortedTimesheets,
        savedTimesheets: [...sortedTimesheets]
      });
    });
  }

  sortTimesheets(timesheets) {
    return timesheets.sort((timesheet1, timesheet2) => {
      if (timesheet1.date > timesheet2.date) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  employeeHasChanges() {
    const employee = this.state.employee;
    const savedEmployee = this.state.savedEmployee;
    if (!savedEmployee) {
      return false;
    }

    if (
      employee.name === savedEmployee.name &&
      employee.position === savedEmployee.position &&
      employee.wage === savedEmployee.wage
    ) {
      return false;
    }

    return true;
  }

  employeeHasAllRequiredFields() {
    return (
      !!this.state.employee.name &&
      !!this.state.employee.position &&
      !!this.state.employee.wage
    );
  }

  timesheetHasChanges(timesheet, timesheetIndex) {
    const savedTimesheet = this.state.savedTimesheets[timesheetIndex];
    if (!timesheet.id) {
      return true;
    }

    if (!savedTimesheet) {
      return false;
    }

    if (
      timesheet.hours === savedTimesheet.hours &&
      timesheet.rate === savedTimesheet.rate
    ) {
      return false;
    }

    return true;
  }

  timesheetHasAllRequiredFields(timesheet) {
    return !!timesheet.hours && !!timesheet.rate;
  }

  updateEmployee(e) {
    const type = e.target.id;
    const newValue = e.target.value;
    this.setState(state => {
      return {
        ...state,
        employee: {
          ...state.employee,
          [type]: newValue
        }
      };
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

  saveEmployee(e) {
    e.preventDefault();
    if (this.state.employee.id) {
      Expresso.updateEmployee(this.state.employee).then(employee => {
        this.setState({
          employee: employee,
          savedEmployee: {
            ...employee
          }
        });
      });
    } else {
      Expresso.createEmployee(this.state.employee).then(employee => {
        this.props.history.push(`/employees/${employee.id}`);
        this.setState({
          employee: employee,
          savedEmployee: {
            ...employee
          }
        });
        Expresso.getTimesheets(this.props.match.params.id).then(timesheets => {
          const sortedTimesheets = this.sortTimesheets(timesheets);
          this.setState({
            timesheets: sortedTimesheets,
            savedTimesheets: [...sortedTimesheets]
          });
        });
      });
    }
  }

  cancelEmployeeEdit() {
    this.setState(state => {
      return {
        ...state,
        employee: {
          ...state.savedEmployee
        }
      };
    });
  }

  deleteEmployee() {
    Expresso.deleteEmployee(this.state.employee.id).then(() => {
      this.props.history.push('/');
    });
  }

  restoreEmployee() {
    Expresso.restoreEmployee(this.state.savedEmployee).then(employee => {
      this.setState(state => {
        return {
          employee: {
            ...state.employee,
            isCurrentEmployee: employee.isCurrentEmployee
          },
          savedEmployee: employee
        };
      });
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
        timesheets = this.sortTimesheets(timesheets);
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
        timesheets = this.sortTimesheets(timesheets);
        savedTimesheets = this.sortTimesheets(savedTimesheets);
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
    if (!this.state.employee) {
      return <div className={style.container} />;
    }
    return (
      <div className={style.container}>
        <h2 className={style.heading}>Employee</h2>
        <div className={style.employeeInfo}>
          <EmployeeInfo
            employee={this.state.employee}
            updateEmployee={this.updateEmployee}
          />
          <EmployeeButtons
            employee={this.state.employee}
            employeeHasChanges={this.employeeHasChanges}
            employeeHasAllRequiredFields={this.employeeHasAllRequiredFields}
            saveEmployee={this.saveEmployee}
            cancelEmployeeEdit={this.cancelEmployeeEdit}
            deleteEmployee={this.deleteEmployee}
            restoreEmployee={this.restoreEmployee}
          />
        </div>
        {this.props.match.params.id === 'new' || (
          <Timesheets
            timesheets={this.state.timesheets}
            updateTimesheet={this.updateTimesheet}
            timesheetHasChanges={this.timesheetHasChanges}
            timesheetHasAllRequiredFields={this.timesheetHasAllRequiredFields}
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

export default withRouter(Employee);
