import React from 'react';
import MenuItemHeader from '../MenuItemHeader/MenuItemHeader.jsx';
import MenuItemButtons from '../MenuItemButtons/MenuItemButtons.jsx';
import style from './MenuItems.module.scss';

const MenuItems = ({
  menuItems,
  updateMenuItem,
  menuItemHasChanges,
  menuItemHasAllRequiredFields,
  saveMenuItem,
  cancelMenuItemEdit,
  deleteMenuItem
}) => {
  let newIndex = 0;
  return (
    <div className={style.table}>
      <MenuItemHeader />
      {
        menuItems.map((menuItem, menuItemIndex) => {
          return (
            <div className={style.row} key={menuItem.id || `new${++newIndex}`}>
              <div className={style.rowItem}><input onChange={(e) => updateMenuItem(e, menuItemIndex)} id="name" value={menuItem.name}/></div>
              <div className={style.rowItem}><input type="number" onChange={(e) => updateMenuItem(e, menuItemIndex)} id="price" value={menuItem.price} /></div>
              <div className={style.rowItem}><input type="number" onChange={(e) => updateMenuItem(e, menuItemIndex)} id="inventory" value={menuItem.inventory} /></div>
              <div className={style.rowItem}><input type="text" onChange={(e) => updateMenuItem(e, menuItemIndex)} id="description" value={menuItem.description} /></div>
              <div className={style.rowItem}>
                <MenuItemButtons
                  menuItem={menuItem}
                  menuItemIndex={menuItemIndex}
                  menuItemHasChanges={menuItemHasChanges}
                  menuItemHasAllRequiredFields={menuItemHasAllRequiredFields}
                  saveMenuItem={saveMenuItem}
                  cancelMenuItemEdit={cancelMenuItemEdit}
                  deleteMenuItem={deleteMenuItem}
                />
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default MenuItems;