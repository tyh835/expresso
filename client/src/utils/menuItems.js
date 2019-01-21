export const menuItemHasAllRequiredFields = menuItem => {
  return (
    !!menuItem.name &&
    !!menuItem.inventory &&
    !!menuItem.price &&
    !!menuItem.description
  );
};

export const menuItemHasChanges = (currentMenuItem, cachedMenuItem) => {
  if (!currentMenuItem.id) return true;
  else if (!cachedMenuItem) return false;
  else if (
    currentMenuItem.name === cachedMenuItem.name &&
    currentMenuItem.description === cachedMenuItem.description &&
    currentMenuItem.inventory === cachedMenuItem.inventory &&
    currentMenuItem.price === cachedMenuItem.price
  ) {
    return false;
  } else return true;
};
