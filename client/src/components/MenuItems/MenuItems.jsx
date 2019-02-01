import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from './MenuItems.module.scss';
import MenuItemHeader from '../MenuItemHeader/MenuItemHeader';
import MenuItemButtons from '../MenuItemButtons/MenuItemButtons';
import { updateMenuItem } from '../../actions';

const MenuItems = ({ menuId, menuItems, updateMenuItem }) => {
  return (
    <div className={style.table}>
      <MenuItemHeader />
      {menuItems.map((menuItem, menuItemIndex) => {
        const { name, price, inventory, description } = menuItem;

        return (
          <div className={style.row} key={menuItem.id || menuItem.tempId}>
            <div className={style.rowItem}>
              <input
                onChange={e => updateMenuItem(e, menuItemIndex)}
                id="name"
                value={name}
              />
            </div>
            <div className={style.rowItem}>
              <input
                type="number"
                onChange={e => updateMenuItem(e, menuItemIndex)}
                id="price"
                value={price}
              />
            </div>
            <div className={style.rowItem}>
              <input
                type="number"
                onChange={e => updateMenuItem(e, menuItemIndex)}
                id="inventory"
                value={inventory}
              />
            </div>
            <div className={style.rowItem}>
              <input
                type="text"
                onChange={e => updateMenuItem(e, menuItemIndex)}
                id="description"
                value={description}
              />
            </div>
            <div className={style.rowItem}>
              <MenuItemButtons menuItemIndex={menuItemIndex} menuId={menuId} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

MenuItems.propTypes = {
  menuId: PropTypes.string,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      inventory: PropTypes.number,
      price: PropTypes.number,
      menuId: PropTypes.number,
      tempId: PropTypes.string
    })
  ),
  updateMenuItem: PropTypes.func
};

const mapStateToProps = state => ({
  menuItems: state.menuItems.currentMenuItems
});

const mapDispatchToProps = {
  updateMenuItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItems);
