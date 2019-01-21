import React from 'react';
import { connect } from 'react-redux';
import style from './MenuButtons.module.scss';
import { cancelMenuEdit, deleteMenu, saveMenu } from '../../actions';
import { menuHasChanges, menuHasAllRequiredFields } from '../../utils/menus';

const MenuButtons = ({
  cachedMenu,
  currentMenu,
  isEmptyMenu,
  cancelMenuEdit,
  saveMenu,
  deleteMenu,
  navigate
}) => {
  const saveButton =
    menuHasChanges(currentMenu, cachedMenu) &&
    menuHasAllRequiredFields(currentMenu) ? (
      <button
        className={style.default}
        onClick={() => saveMenu(currentMenu, navigate)}
      >
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
    <button
      className={style.delete}
      onClick={() => deleteMenu(currentMenu.id, navigate)}
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
  currentMenu: state.menus.currentMenu,
  cachedMenu: state.menus.cachedMenu,
  isEmptyMenu: !state.menuItems.currentMenuItems.length
});

export default connect(
  mapStateToProps,
  { cancelMenuEdit, deleteMenu, saveMenu }
)(MenuButtons);
