import React from 'react';
import { Link } from 'react-router-dom';
import style from './MenuLinks.module.scss';

const MenuLinks = ({ menus }) => {
  return menus.map(menu => {
    return (
      <Link to={`/menus/${menu.id}`}
         className={style.menuItem}
         key={menu.id}>
        <h3>{menu.title}</h3>
      </Link>
    );
  });
}

export default MenuLinks;