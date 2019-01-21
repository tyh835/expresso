import React from 'react';
import style from './EmployeeButtons.module.scss';
import {
  employeeHasChanges,
  employeeHasAllRequiredFields
} from '../../utils/employees';

const EmployeeButtons = ({
  employee,
  saveEmployee,
  cancelEmployeeEdit,
  deleteEmployee,
  restoreEmployee
}) => {
  const saveButton =
    employeeHasChanges(employee, {}) &&
    employeeHasAllRequiredFields(employee) ? (
      <button className={style.default} onClick={saveEmployee}>
        Save
      </button>
    ) : (
      <button className={style.inactive}>Save</button>
    );

  const cancelButton = employeeHasChanges(employee, {}) ? (
    <button className={style.default} onClick={cancelEmployeeEdit}>
      Cancel
    </button>
  ) : (
    <button className={style.inactive}>Cancel</button>
  );

  const deleteButton = employee.isCurrentEmployee ? (
    <button className={style.delete} onClick={deleteEmployee}>
      Delete
    </button>
  ) : (
    <button className={style.default} onClick={restoreEmployee}>
      Restore
    </button>
  );

  return (
    <div>
      {saveButton}
      {cancelButton}
      {employee.id && deleteButton}
    </div>
  );
};

export default EmployeeButtons;
