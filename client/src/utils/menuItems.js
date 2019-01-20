export const menuItemHasAllRequiredFields = menuItem => {
  return (
    !!menuItem.name &&
    !!menuItem.inventory &&
    !!menuItem.price &&
    !!menuItem.description
  );
};

export const menuItemHasChanges = (menuItem, cachedMenuItem) => {
  if (!menuItem.id) return true;
  else if (!cachedMenuItem) return false;
  else if (
    menuItem.name === cachedMenuItem.name &&
    menuItem.description === cachedMenuItem.description &&
    menuItem.inventory === cachedMenuItem.inventory &&
    menuItem.price === cachedMenuItem.price
  ) {
    return false;
  } else return true;
};
