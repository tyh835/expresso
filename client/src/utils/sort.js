export const sortItemNames = (items, field) => {
  return items.sort((item1, item2) => {
    if (item2[field].toLowerCase() < item1[field].toLowerCase()) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const sortMenuItems = menuItems => {
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
