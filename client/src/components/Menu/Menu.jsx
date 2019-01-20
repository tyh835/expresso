import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid/v4';
import style from './Menu.module.scss';

import MenuButtons from '../MenuButtons/MenuButtons';
import MenuItems from '../MenuItems/MenuItems';
import Expresso from '../../utils/Expresso';
import { sortMenuItems } from '../../utils/sort';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: null,
      menuItems: []
    };

    this.updateMenuTitle = this.updateMenuTitle.bind(this);
    this.updateMenuItem = this.updateMenuItem.bind(this);
    this.saveMenu = this.saveMenu.bind(this);
    this.cancelMenuEdit = this.cancelMenuEdit.bind(this);
    this.deleteMenu = this.deleteMenu.bind(this);
    this.addMenuItem = this.addMenuItem.bind(this);
    this.saveMenuItem = this.saveMenuItem.bind(this);
    this.cancelMenuItemEdit = this.cancelMenuItemEdit.bind(this);
    this.deleteMenuItem = this.deleteMenuItem.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id === 'new') {
      const newMenu = {
        title: ''
      };

      this.setState({
        menu: newMenu,
        savedMenu: {
          ...newMenu
        }
      });
      return;
    }

    Expresso.getMenu(this.props.match.params.id).then(menu => {
      if (menu) {
        this.setState({
          menu: menu,
          savedMenu: {
            ...menu
          }
        });
      }
    });

    Expresso.getMenuItems(this.props.match.params.id).then(menuItems => {
      const sortedMenuItems = sortMenuItems(menuItems);
      this.setState({
        menuItems: sortedMenuItems,
        savedMenuItems: [...sortedMenuItems]
      });
    });
  }

  updateMenuTitle(e) {
    const title = e.target.value;
    this.setState(state => {
      return {
        ...state,
        menu: {
          ...state.menu,
          title
        }
      };
    });
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

  saveMenu() {
    if (this.state.menu.id) {
      Expresso.updateMenu(this.state.menu).then(menu => {
        this.setState({
          menu,
          savedMenu: {
            ...menu
          }
        });
      });
    } else {
      Expresso.createMenu(this.state.menu).then(menu => {
        this.props.history.push(`/menus/${menu.id}`);
        this.setState({
          menu,
          savedMenu: {
            ...menu
          }
        });
        Expresso.getMenuItems(this.props.match.params.id).then(menuItems => {
          const sortedMenuItems = sortMenuItems(menuItems);
          this.setState({
            menuItems: sortedMenuItems,
            savedMenuItems: [...sortedMenuItems]
          });
        });
      });
    }
  }

  cancelMenuEdit() {
    this.setState(state => {
      return {
        menu: {
          ...state.savedMenu
        }
      };
    });
  }

  deleteMenu() {
    if (this.state.menu.id) {
      Expresso.deleteMenu(this.state.menu.id).then(() => {
        this.props.history.push('/');
      });
    } else {
      this.props.history.push('/');
    }
  }

  addMenuItem() {
    if (this.props.match.params.id === 'new') return;

    const newMenuItem = {
      name: '',
      description: '',
      inventory: 0,
      price: 0,
      tempId: uuid()
    };

    this.setState(state => {
      return {
        menuItems: [...state.menuItems, newMenuItem],
        savedMenuItems: [...state.savedMenuItems, newMenuItem]
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

  cancelMenuItemEdit(menuItemIndex) {
    const menuItem = this.state.menuItems[menuItemIndex];
    if (!menuItem.id) {
      this.deleteMenuItem(menuItemIndex);
    } else {
      this.setState(state => {
        return {
          menuItems: state.menuItems.map((menuItem, i) => {
            return i === menuItemIndex ? state.savedMenuItems[i] : menuItem;
          })
        };
      });
    }
  }

  deleteMenuItem(menuItemIndex) {
    const menuItem = this.state.menuItems[menuItemIndex];
    if (!menuItem.id) {
      this.setState(state => {
        return {
          menuItems: state.menuItems.filter((_, i) => i !== menuItemIndex),
          savedMenuItems: state.savedMenuItems.filter(
            (_, i) => i !== menuItemIndex
          )
        };
      });
    } else {
      Expresso.deleteMenuItem(menuItem.id, this.state.menu.id).then(() => {
        this.setState(state => {
          return {
            menuItems: state.menuItems.filter((_, i) => i !== menuItemIndex),
            savedMenuItems: state.savedMenuItems.filter(
              (_, i) => i !== menuItemIndex
            )
          };
        });
      });
    }
  }

  render() {
    if (!this.state.menu) {
      return <div className={style.Menu} />;
    }
    const menu = this.state.menu;
    return (
      <div className={style.container}>
        <div className={style.menuName}>
          <input
            onChange={this.updateMenuTitle}
            value={menu.title}
            placeholder="Menu Title"
          />
          <MenuButtons
            saveMenu={this.saveMenu}
            cancelMenuEdit={this.cancelMenuEdit}
            deleteMenu={this.deleteMenu}
          />
        </div>
        {this.props.match.params.id === 'new' || (
          <MenuItems
            menuItems={this.state.menuItems}
            updateMenuItem={this.updateMenuItem}
            saveMenuItem={this.saveMenuItem}
            cancelMenuItemEdit={this.cancelMenuItemEdit}
            deleteMenuItem={this.deleteMenuItem}
          />
        )}
        <button className={style.addButton} onClick={this.addMenuItem}>
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

export default connect(mapStateToProps)(withRouter(Menu));
