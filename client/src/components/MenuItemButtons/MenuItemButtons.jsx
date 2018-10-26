import React from 'react';
import style from './MenuItemButtons.module.scss';

const MenuButtons = ({
    menuItem,
    menuItemIndex,
    menuItemHasChanges,
    menuItemHasAllRequiredFields,
    saveMenuItem,
    cancelMenuItemEdit,
    deleteMenuItem
  }) => {

  const saveButton = (menuItemHasChanges(menuItem, menuItemIndex) && menuItemHasAllRequiredFields(menuItem)) ? (
    <button className={menuItemIndex % 2 ? style.odd : style.even} onClick={() => saveMenuItem(menuItemIndex)}>Save</button>
  ) : (
    <button className={style.inactive}>Save</button>
  );

  const cancelButton = (menuItemHasChanges(menuItem, menuItemIndex)) ? (
    <button className={menuItemIndex % 2 ? style.odd : style.even} onClick={() => cancelMenuItemEdit(menuItemIndex)}>Cancel</button>
  ) : (
    <button className={style.inactive}>Cancel</button>
  );

  const deleteButton = <button className={style.delete} onClick={() => deleteMenuItem(menuItemIndex)}>Delete</button>;

  return (
    <div>
      {saveButton}
      {cancelButton}
      {deleteButton}
    </div>
  );
}

export default MenuButtons;
