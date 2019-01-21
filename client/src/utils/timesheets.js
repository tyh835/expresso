export const timesheetHasChanges = (currentTimesheet, cachedTimesheet) => {
  if (!currentTimesheet.id) return true;
  if (!cachedTimesheet) return false;

  if (
    currentTimesheet.hours === cachedTimesheet.hours &&
    currentTimesheet.rate === cachedTimesheet.rate
  ) {
    return false;
  }

  return true;
};

export const timesheetHasAllRequiredFields = timesheet => {
  return !!timesheet.hours && !!timesheet.rate;
};
