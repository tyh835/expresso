import React from 'react';
import { connect } from 'react-redux';
import { menuHasChanges, menuHasAllRequiredFields } from '../../utils/menus';
import style from './MenuButtons.module.scss';

const MenuButtons = ({
  cachedMenu,
  currentMenu,
  isEmptyMenu,
  saveMenu,
  cancelMenuEdit,
  deleteMenu
}) => {
  const saveButton =
    menuHasChanges(currentMenu, cachedMenu) &&
    menuHasAllRequiredFields(currentMenu) ? (
      <button className={style.default} onClick={saveMenu}>
        Save
      </button>
    ) : (
      <button className={style.inactive}>Save</button>
    );

  const cancelButton = menuHasChanges(currentMenu, cachedMenu) ? (
    <button className={style.default} onClick={cancelMenuEdit}>
      Cancel
    </button>
  ) : (
    <button className={style.inactive}>Cancel</button>
  );

  const deleteButton = isEmptyMenu && (
    <button className={style.delete} onClick={deleteMenu}>
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
  currentMenu: state.menus.currentMenu,
  cachedMenu: state.menus.cachedMenu,
  isEmptyMenu: state.menuItems.length
});

export default connect(mapStateToProps)(MenuButtons);
