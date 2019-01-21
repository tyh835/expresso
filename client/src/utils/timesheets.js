export const timesheetHasChanges = (timesheet, timesheetIndex) => {
  const savedTimesheet = this.state.savedTimesheets[timesheetIndex];
  if (!timesheet.id) return true;
  if (!savedTimesheet) return false;

  if (
    timesheet.hours === savedTimesheet.hours &&
    timesheet.rate === savedTimesheet.rate
  ) {
    return false;
  }

  return true;
};

export const timesheetHasAllRequiredFields = timesheet => {
  return !!timesheet.hours && !!timesheet.rate;
};
