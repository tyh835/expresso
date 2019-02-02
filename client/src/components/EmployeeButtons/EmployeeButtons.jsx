import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from './EmployeeButtons.module.scss';
import {
  employeeHasChanges,
  employeeHasAllRequiredFields
} from '../../utils/employees';
import {
  cancelEmployeeEdit,
  deleteEmployee,
  restoreEmployee,
  saveEmployee
} from '../../actions';

const EmployeeButtons = ({
  currentEmployee,
  cachedEmployee,
  cancelEmployeeEdit,
  deleteEmployee,
  navigate,
  restoreEmployee,
  saveEmployee
}) => {
  const saveButton =
    employeeHasChanges(currentEmployee, cachedEmployee) &&
    employeeHasAllRequiredFields(currentEmployee) ? (
      <button
        className={style.default}
        onClick={() => saveEmployee(currentEmployee, navigate)}
      >
        Save
      </button>
    ) : (
      <button className={style.inactive}>Save</button>
    );

  const cancelButton = employeeHasChanges(currentEmployee, cachedEmployee) ? (
    <button className={style.default} onClick={cancelEmployeeEdit}>
      Cancel
    </button>
  ) : (
    <button className={style.inactive}>Cancel</button>
  );

  const deleteButton = currentEmployee.isCurrentEmployee ? (
    <button
      className={style.delete}
      onClick={() => deleteEmployee(currentEmployee.id, navigate)}
    >
      Delete
    </button>
  ) : (
    <button
      className={style.default}
      onClick={() => restoreEmployee(cachedEmployee)}
    >
      Restore
    </button>
  );

  return (
    <div>
      {saveButton}
      {cancelButton}
      {currentEmployee.id && deleteButton}
    </div>
  );
};

EmployeeButtons.propTypes = {
  currentEmployee: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    position: PropTypes.string,
    wage: PropTypes.number,
    isCurrentEmployee: PropTypes.number
  }).isRequired,
  cachedEmployee: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    position: PropTypes.string,
    wage: PropTypes.number,
    isCurrentEmployee: PropTypes.number
  }).isRequired,
  cancelEmployeeEdit: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  restoreEmployee: PropTypes.func.isRequired,
  saveEmployee: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentEmployee: state.employees.currentEmployee,
  cachedEmployee: state.employees.cachedEmployee
});

const mapDispatchToProps = {
  cancelEmployeeEdit,
  deleteEmployee,
  restoreEmployee,
  saveEmployee
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeButtons);
