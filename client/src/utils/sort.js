export const sortItemNames = (items, field) => {
  if (items.length === 0) return [];
  return items.sort((item1, item2) => {
    if (item2[field].toLowerCase() < item1[field].toLowerCase()) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const sortMenuItems = menuItems => {
  if (menuItems.length === 0) return [];
  return menuItems.sort((menuItem1, menuItem2) => {
    if (!menuItem2.id) {
      return -1;
    }
    if (menuItem1.name < menuItem2.name) {
      return -1;
    } else {
      return 1;
    }
  });
};

export const sortTimesheets = timesheets => {
  if (timesheets.length === 0) return [];
  return timesheets.sort((timesheet1, timesheet2) => {
    if (timesheet1.date > timesheet2.date) {
      return -1;
    } else {
      return 1;
    }
  });
};
