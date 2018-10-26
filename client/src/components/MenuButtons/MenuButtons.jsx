import React from 'react';
import style from './MenuButtons.module.scss';

const MenuButtons = ({
    isEmptyMenu,
    menuHasChanges,
    menuHasAllRequiredFields,
    saveMenu,
    cancelMenuEdit,
    deleteMenu
  }) => {

  const saveButton = (menuHasChanges() && menuHasAllRequiredFields()) ? (
    <button className={style.default} onClick={saveMenu}>Save</button>
    ) : (
    <button className={style.inactive}>Save</button>
  );

  const cancelButton = menuHasChanges() ? (
    <button className={style.default} onClick={cancelMenuEdit}>Cancel</button>
  ) : (
    <button className={style.inactive}>Cancel</button>
  );

  const deleteButton = isEmptyMenu && <button className={style.delete} onClick={deleteMenu}>Delete</button>;

  return (
    <div>
      {saveButton}
      {cancelButton}
      {deleteButton}
    </div>
  );
}

export default MenuButtons;
