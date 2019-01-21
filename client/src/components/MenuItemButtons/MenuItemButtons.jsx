import React from 'react';
import { connect } from 'react-redux';
import style from './MenuItemButtons.module.scss';
import {
  menuItemHasChanges,
  menuItemHasAllRequiredFields
} from '../../utils/menuItems';
import { cancelMenuItemEdit, deleteMenuItem } from '../../actions';

const MenuButtons = ({
  cachedMenuItems,
  currentMenuItems,
  menuId,
  menuItemIndex,
  saveMenuItem,
  cancelMenuItemEdit,
  deleteMenuItem
}) => {
  const cachedMenuItem = cachedMenuItems[menuItemIndex];
  const saveButton =
    menuItemHasChanges(currentMenuItems, cachedMenuItem) &&
    menuItemHasAllRequiredFields(currentMenuItems) ? (
      <button
        className={menuItemIndex % 2 ? style.odd : style.even}
        onClick={() => {}}
      >
        Save
      </button>
    ) : (
      <button className={style.inactive}>Save</button>
    );

  const cancelButton = menuItemHasChanges(currentMenuItems, cachedMenuItem) ? (
    <button
      className={menuItemIndex % 2 ? style.odd : style.even}
      onClick={() => cancelMenuItemEdit(currentMenuItems, menuItemIndex)}
    >
      Cancel
    </button>
  ) : (
    <button className={style.inactive}>Cancel</button>
  );

  const deleteButton = (
    <button
      className={style.delete}
      onClick={() => deleteMenuItem(currentMenuItems, menuId, menuItemIndex)}
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

export default connect(
  mapStateToProps,
  { cancelMenuItemEdit, deleteMenuItem }
)(MenuButtons);
