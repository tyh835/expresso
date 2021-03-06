import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from './MenuItemButtons.module.scss';
import {
  menuItemHasChanges,
  menuItemHasAllRequiredFields
} from '../../utils/menuItems';
import {
  cancelMenuItemEdit,
  deleteMenuItem,
  saveMenuItem
} from '../../actions';

const MenuItemButtons = ({
  cachedMenuItems,
  currentMenuItems,
  menuId,
  menuItemIndex,
  saveMenuItem,
  cancelMenuItemEdit,
  deleteMenuItem
}) => {
  const currentMenuItem = currentMenuItems[menuItemIndex];
  const cachedMenuItem = cachedMenuItems[menuItemIndex];
  const menuItemId = currentMenuItem.id;

  const saveButton =
    menuItemHasChanges(currentMenuItem, cachedMenuItem) &&
    menuItemHasAllRequiredFields(currentMenuItem) ? (
      <button
        className={menuItemIndex % 2 ? style.odd : style.even}
        onClick={() =>
          saveMenuItem(currentMenuItems, cachedMenuItems, menuItemIndex, menuId)
        }
      >
        Save
      </button>
    ) : (
      <button className={style.inactive}>Save</button>
    );

  const cancelButton = menuItemHasChanges(currentMenuItem, cachedMenuItem) ? (
    <button
      className={menuItemIndex % 2 ? style.odd : style.even}
      onClick={() => cancelMenuItemEdit(menuItemId, menuItemIndex)}
    >
      Cancel
    </button>
  ) : (
    <button className={style.inactive}>Cancel</button>
  );

  const deleteButton = (
    <button
      className={style.delete}
      onClick={() => deleteMenuItem(menuItemId, menuId, menuItemIndex)}
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

MenuItemButtons.propTypes = {
  cachedMenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      inventory: PropTypes.number,
      price: PropTypes.number,
      menuId: PropTypes.number,
      tempId: PropTypes.string
    })
  ).isRequired,
  currentMenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      inventory: PropTypes.number,
      price: PropTypes.number,
      menuId: PropTypes.number,
      tempId: PropTypes.string
    })
  ).isRequired,
  menuId: PropTypes.string.isRequired,
  menuItemIndex: PropTypes.number.isRequired,
  saveMenuItem: PropTypes.func.isRequired,
  cancelMenuItemEdit: PropTypes.func.isRequired,
  deleteMenuItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentMenuItems: state.menuItems.currentMenuItems,
  cachedMenuItems: state.menuItems.cachedMenuItems
});

const mapDispatchToProps = {
  cancelMenuItemEdit,
  deleteMenuItem,
  saveMenuItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItemButtons);
