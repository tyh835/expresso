export const employeeHasChanges = (currentEmployee, cachedEmployee) => {
  if (!cachedEmployee) return false;

  if (
    currentEmployee.name === cachedEmployee.name &&
    currentEmployee.position === cachedEmployee.position &&
    currentEmployee.wage === cachedEmployee.wage
  ) {
    return false;
  }

  return true;
};

export const employeeHasAllRequiredFields = employee => {
  return !!employee.name && !!employee.position && !!employee.wage;
};
