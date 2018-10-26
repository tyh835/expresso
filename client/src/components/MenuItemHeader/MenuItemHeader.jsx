import React from 'react';
import style from './MenuItemHeader.module.scss';

const MenuItemHeader = () => {
  return (
    <div className={style.header} >
      <div className={style.rowItem}>Name</div>
      <div className={style.rowItem}>Price</div>
      <div className={style.rowItem}>Inventory</div>
      <div className={style.rowItem}>Description</div>
      <div className={style.rowItem}></div>
    </div>
  )
}

export default MenuItemHeader;