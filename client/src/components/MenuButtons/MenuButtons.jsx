import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

  const deleteButton = (
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
      {isEmptyMenu && deleteButton}
    </div>
  );
};

MenuButtons.propTypes = {
  cachedMenu: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string
  }),
  currentMenu: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string
  }),
  isEmptyMenu: PropTypes.bool,
  cancelMenuEdit: PropTypes.func,
  saveMenu: PropTypes.func,
  deleteMenu: PropTypes.func,
  navigate: PropTypes.func
};

const mapStateToProps = state => ({
  currentMenu: state.menus.currentMenu,
  cachedMenu: state.menus.cachedMenu,
  isEmptyMenu: !state.menuItems.currentMenuItems.length
});

const mapDispatchToProps = {
  cancelMenuEdit,
  deleteMenu,
  saveMenu
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuButtons);
