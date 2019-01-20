import React from 'react';
import { connect } from 'react-redux';
import {
  menuItemHasChanges,
  menuItemHasAllRequiredFields
} from '../../utils/menuItems';
import style from './MenuItemButtons.module.scss';

const MenuButtons = ({
  cachedMenuItems,
  currentMenuItems,
  menuItem,
  menuItemIndex,
  saveMenuItem,
  cancelMenuItemEdit,
  deleteMenuItem
}) => {
  const cachedMenuItem = cachedMenuItems[menuItemIndex];
  const saveButton =
    menuItemHasChanges(menuItem, cachedMenuItem) &&
    menuItemHasAllRequiredFields(menuItem) ? (
      <button
        className={menuItemIndex % 2 ? style.odd : style.even}
        onClick={() => saveMenuItem(menuItemIndex)}
      >
        Save
      </button>
    ) : (
      <button className={style.inactive}>Save</button>
    );

  const cancelButton = menuItemHasChanges(menuItem, cachedMenuItem) ? (
    <button
      className={menuItemIndex % 2 ? style.odd : style.even}
      onClick={() => cancelMenuItemEdit(menuItemIndex)}
    >
      Cancel
    </button>
  ) : (
    <button className={style.inactive}>Cancel</button>
  );

  const deleteButton = (
    <button
      className={style.delete}
      onClick={() => deleteMenuItem(menuItemIndex)}
    >
      Delete
    </button>
  );

  return (
    <div>
      {saveButton}
      {cancelButton}
      {deleteButton}
    </div>
  );
};

const mapStateToProps = state => ({
  currentMenuItems: state.menuItems.currentMenuItems,
  cachedMenuItems: state.menuItems.cachedMenuItems
});

export default connect(mapStateToProps)(MenuButtons);
