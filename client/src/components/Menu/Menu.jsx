import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import style from './Menu.module.scss';
import MenuButtons from '../MenuButtons/MenuButtons';
import MenuItems from '../MenuItems/MenuItems';
import Expresso from '../../utils/Expresso';
import { sortMenuItems } from '../../utils/sort';
import {
  addMenuItem,
  clearMenu,
  fetchMenu,
  fetchMenuItems,
  updateMenuTitle
} from '../../actions';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.updateMenuItem = this.updateMenuItem.bind(this);
    this.saveMenuItem = this.saveMenuItem.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id === 'new') {
      return this.props.clearMenu();
    } else {
      this.props.fetchMenu(id);
      this.props.fetchMenuItems(id);
    }
  }

  updateMenuItem(e, menuItemIndex) {
    const type = e.target.id;
    const newValue = e.target.value;
    this.setState(state => {
      state.menuItems[menuItemIndex] = {
        ...state.menuItems[menuItemIndex],
        [type]: newValue
      };
      return {
        ...state,
        menuItems: state.menuItems
      };
    });
  }

  saveMenuItem(menuItemIndex) {
    if (this.state.menuItems[menuItemIndex].id) {
      Expresso.updateMenuItem(
        this.state.menuItems[menuItemIndex],
        this.state.menu.id
      ).then(newMenuItem => {
        let menuItems = this.state.menuItems.map((menuItem, i) =>
          i === menuItemIndex ? newMenuItem : menuItem
        );
        menuItems = sortMenuItems(menuItems);
        this.setState({
          menuItems,
          savedMenuItems: [...menuItems]
        });
      });
    } else {
      Expresso.createMenuItem(
        this.state.menuItems[menuItemIndex],
        this.state.menu.id
      ).then(newMenuItem => {
        let menuItems = this.state.menuItems.map((menuItem, i) =>
          i === menuItemIndex ? newMenuItem : menuItem
        );
        let savedMenuItems = this.state.savedMenuItems.map((menuItem, i) =>
          i === menuItemIndex ? newMenuItem : menuItem
        );
        menuItems = sortMenuItems(menuItems);
        savedMenuItems = sortMenuItems(savedMenuItems);
        this.setState({
          menuItems,
          savedMenuItems
        });
      });
    }
  }

  render() {
    const { addMenuItem, currentMenu, updateMenuTitle } = this.props;
    const menuId = this.props.match.params.id;

    if (!currentMenu) {
      return <div className={style.container} />;
    }

    return (
      <div className={style.container}>
        <div className={style.menuName}>
          <input
            onChange={e => updateMenuTitle(e)}
            value={currentMenu.title}
            placeholder="Menu Title"
          />
          <MenuButtons navigate={this.props.history.push} />
        </div>
        {menuId === 'new' || <MenuItems menuId={menuId} />}
        <button className={style.addButton} onClick={() => addMenuItem(menuId)}>
          Add Menu Item
        </button>
        <p className={style.responsiveMessage}>
          Please widen your browser to enable Menu editing.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentMenu: state.menus.currentMenu,
  cachedMenu: state.menus.cachedMenu
});

export default connect(
  mapStateToProps,
  { addMenuItem, clearMenu, fetchMenu, fetchMenuItems, updateMenuTitle }
)(withRouter(Menu));
