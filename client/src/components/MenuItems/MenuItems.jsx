import React from 'react';
import style from './MenuItems.module.scss';
import MenuItemHeader from '../MenuItemHeader/MenuItemHeader';
import MenuItemButtons from '../MenuItemButtons/MenuItemButtons';

const MenuItems = ({
  menuItems,
  updateMenuItem,
  menuItemHasChanges,
  saveMenuItem,
  cancelMenuItemEdit,
  deleteMenuItem
}) => {
  return (
    <div className={style.table}>
      <MenuItemHeader />
      {menuItems.map((menuItem, menuItemIndex) => {
        return (
          <div className={style.row} key={menuItem.id || menuItem.tempId}>
            <div className={style.rowItem}>
              <input
                onChange={e => updateMenuItem(e, menuItemIndex)}
                id="name"
                value={menuItem.name}
              />
            </div>
            <div className={style.rowItem}>
              <input
                type="number"
                onChange={e => updateMenuItem(e, menuItemIndex)}
                id="price"
                value={menuItem.price}
              />
            </div>
            <div className={style.rowItem}>
              <input
                type="number"
                onChange={e => updateMenuItem(e, menuItemIndex)}
                id="inventory"
                value={menuItem.inventory}
              />
            </div>
            <div className={style.rowItem}>
              <input
                type="text"
                onChange={e => updateMenuItem(e, menuItemIndex)}
                id="description"
                value={menuItem.description}
              />
            </div>
            <div className={style.rowItem}>
              <MenuItemButtons
                menuItem={menuItem}
                menuItemIndex={menuItemIndex}
                menuItemHasChanges={menuItemHasChanges}
                saveMenuItem={saveMenuItem}
                cancelMenuItemEdit={cancelMenuItemEdit}
                deleteMenuItem={deleteMenuItem}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuItems;
