import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './Employee.scss';

import Expresso from '../../utils/Expresso';

class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: null,
      timesheets: []
    };

    this.updateEmployee = this.updateEmployee.bind(this);
    this.updateTimesheet = this.updateTimesheet.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.cancelEmployeeEdit = this.cancelEmployeeEdit.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.restoreEmployee = this.restoreEmployee.bind(this);
    this.employeeHasChanges = this.employeeHasChanges.bind(this);
    this.employeeHasAllRequiredFields = this.employeeHasAllRequiredFields.bind(this);
    this.addTimesheet = this.addTimesheet.bind(this);
    this.saveTimesheet = this.saveTimesheet.bind(this);
    this.cancelTimesheetEdit = this.cancelTimesheetEdit.bind(this);
    this.deleteTimesheet = this.deleteTimesheet.bind(this);
    this.timesheetHasChanges = this.timesheetHasChanges.bind(this);
    this.timesheetHasAllRequiredFields = this.timesheetHasAllRequiredFields.bind(this);
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
        savedTimesheets: [
          ...sortedTimesheets
        ]
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

    if (employee.name === savedEmployee.name &&
        employee.position === savedEmployee.position &&
        employee.wage === savedEmployee.wage) {
      return false;
    }

    return true;
  }

  employeeHasAllRequiredFields() {
    return !!this.state.employee.name
        && !!this.state.employee.position
        && !!this.state.employee.wage;
  }

  timesheetHasChanges(timesheet, timesheetIndex) {
    const savedTimesheet = this.state.savedTimesheets[timesheetIndex];
    if (!timesheet.id) {
      return true;
    }

    if (!savedTimesheet) {
      return false;
    }

    if (timesheet.hours === savedTimesheet.hours && timesheet.rate === savedTimesheet.rate) {
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
      }
    });
  }

  updateTimesheet(e, timesheetIndex) {
    const type = e.target.id;
    const newValue = e.target.value;
    this.setState(state => {
      state.timesheets[timesheetIndex] = {
        ...state.timesheets[timesheetIndex],
        [type]: newValue
      }
      return {
        ...state,
        timesheets: state.timesheets
      }
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
            savedTimesheets: {
              ...sortedTimesheets
            }
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
      }
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
        }
      });
    });
  }

  addTimesheet() {
    const newtimesheet = {
      hours: 0,
      rate: this.state.employee.wage,
      date: Date.now(),
      employeeId: this.state.employee.id
    };

    this.setState(state => {
      return {
        ...state,
        timesheets: [
          newtimesheet,
          ...state.timesheets
        ],
        savedTimesheets: [
          newtimesheet,
          ...state.savedTimesheets
        ]
      }}
    );
  }

  saveTimesheet(timesheetIndex) {
    if (this.state.timesheets[timesheetIndex].id) {
      Expresso.updateTimesheet(this.state.timesheets[timesheetIndex], this.state.employee.id)
        .then(newTimesheet => {
          let timesheets = this.state.timesheets.map((timesheet, i) => i === timesheetIndex ? newTimesheet : timesheet);
          timesheets = this.sortTimesheets(timesheets);
          this.setState({
            timesheets,
            savedTimesheets: [
              ...timesheets
            ]
          });
        });
    } else {
      Expresso.createTimesheet(this.state.timesheets[timesheetIndex], this.state.employee.id)
        .then(newTimesheet => {
          let timesheets = this.state.timesheets.map((timesheet, i) => i === timesheetIndex ? newTimesheet : timesheet);
          let savedTimesheets = this.state.savedTimesheets.map((timesheet, i) => i === timesheetIndex ? newTimesheet : timesheet);
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
        }
      });
    }
  }

  deleteTimesheet(timesheetIndex) {
    const timesheet = this.state.timesheets[timesheetIndex];
    if (!timesheet.id) {
      this.setState(state => {
        return {
          timesheets: state.timesheets.filter((_, i) => i !== timesheetIndex),
          savedTimesheets: state.savedTimesheets.filter((_, i) => i !== timesheetIndex)
        }
      });
    } else {
      Expresso.deleteTimesheet(timesheet.id, this.state.employee.id).then(() => {
        this.setState(state => {
          return {
            timesheets: state.timesheets.filter((_, i) => i !== timesheetIndex),
            savedTimesheets: state.savedTimesheets.filter((_, i) => i !== timesheetIndex)
          }
        });
      });
    }
  }

  renderEmployeeButtons() {
    const employee = this.state.employee;
    let saveButton, cancelButton, deleteButton;

    if (this.employeeHasChanges() && this.employeeHasAllRequiredFields()) {
      saveButton =<button className="button" onClick={this.saveEmployee}>Save</button>;
    } else {
      saveButton = <button className="button--inactive">Save</button>;
    }

    if (this.employeeHasChanges()) {
      cancelButton =<button className="button" onClick={this.cancelEmployeeEdit}>Cancel</button>
    } else {
      cancelButton = <button className="button--inactive">Cancel</button>;
    }

    if (employee.isCurrentEmployee && employee.id) {
      deleteButton = <button className="button--delete" onClick={this.deleteEmployee}>Delete</button>;
    } else if (employee.id) {
      deleteButton = <button className="button" onClick={this.restoreEmployee}>Restore</button>
    } else {
      deleteButton = '';
    }

    return (
      <div>
        {saveButton}
        {cancelButton}
        {deleteButton}
      </div>
    )
  }

  renderTimesheetButtons(timesheet, timesheetIndex) {
    let saveButton, cancelButton, deleteButton;

    if (this.timesheetHasChanges(timesheet, timesheetIndex) && this.timesheetHasAllRequiredFields(timesheet)) {
      saveButton =<button className="button" onClick={this.saveTimesheet.bind(this, timesheetIndex)}>Save</button>;
    } else {
      saveButton = <button className="button--inactive">Save</button>;
    }

    if (this.timesheetHasChanges(timesheet, timesheetIndex)) {
      cancelButton =<button className="button" onClick={this.cancelTimesheetEdit.bind(this, timesheetIndex)}>Cancel</button>
    } else {
      cancelButton = <button className='button--inactive'>Cancel</button>;
    }

    deleteButton = <button className='button--delete' onClick={this.deleteTimesheet.bind(this, timesheetIndex)}>Delete</button>;

    return (
      <div className="timesheet__buttons">
        {saveButton}
        {cancelButton}
        {deleteButton}
      </div>
    )
  }

  renderTimesheets() {
    if (this.props.match.params.id === 'new') {
      return '';
    }
    const timesheets = this.state.timesheets.map((timesheet, timesheetIndex) => {
      return (
        <div className="timesheet__card" key={timesheet.id}>
          <p className="strong">Date: {new Date(timesheet.date).toDateString()}</p>
          <p>Hours: <input onChange={e => this.updateTimesheet(e, timesheetIndex)} id="hours" value={timesheet.hours} type="number" /></p>
          <p>Rate: $<input onChange={e => this.updateTimesheet(e, timesheetIndex)} id="rate" value={timesheet.rate} type="number" /> / hour</p>
          <p>Total: ${timesheet.hours * timesheet.rate}</p>
          {this.renderTimesheetButtons(timesheet, timesheetIndex)}
        </div>
      );
    });

    return (
      <div>
        <h2 className="Employee__heading">Timesheets</h2>
        <div className="timesheet">
          {timesheets}
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.employee) {
      return <div className="Employee"></div>
    }
    const employee = this.state.employee;
    return (
      <div className="Employee">
        <h2 className="Employee__heading">Employee</h2>
        <div className="employee">
          {!this.state.employee.isCurrentEmployee && <h3 className="strong">Retired</h3>}
          <p className="strong"><span>Name: </span><input onChange={this.updateEmployee} id="name" value={employee.name} /></p>
          <p><span>Positions: </span><input onChange={this.updateEmployee} id="position" value={employee.position} /></p>
          <p><span>Wage ($/hour): </span><input onChange={this.updateEmployee} id="wage" value={employee.wage} type="number" /></p>
          {this.renderEmployeeButtons()}
        </div>
        {this.renderTimesheets()}
        <button className="button--add" onClick={this.addTimesheet}>Add Timesheet</button>
      </div>
    );
  }
}

export default withRouter(Employee);
