export const menuHasAllRequiredFields = menu => {
  return !!menu.title;
};

export const menuHasChanges = (currentMenu, cachedMenu) => {
  if (!cachedMenu) return false;
  else if (currentMenu.title === cachedMenu.title) return false;
  else return true;
};
