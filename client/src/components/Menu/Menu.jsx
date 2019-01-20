import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid/v4';
import style from './Menu.module.scss';

import MenuButtons from '../MenuButtons/MenuButtons';
import MenuItems from '../MenuItems/MenuItems';
import Expresso from '../../utils/Expresso';

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
    this.menuHasChanges = this.menuHasChanges.bind(this);
    this.menuHasAllRequiredFields = this.menuHasAllRequiredFields.bind(this);
    this.addMenuItem = this.addMenuItem.bind(this);
    this.saveMenuItem = this.saveMenuItem.bind(this);
    this.cancelMenuItemEdit = this.cancelMenuItemEdit.bind(this);
    this.deleteMenuItem = this.deleteMenuItem.bind(this);
    this.menuItemHasChanges = this.menuItemHasChanges.bind(this);
    this.menuItemHasAllRequiredFields = this.menuItemHasAllRequiredFields.bind(
      this
    );
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
      const sortedMenuItems = this.sortMenuItems(menuItems);
      this.setState({
        menuItems: sortedMenuItems,
        savedMenuItems: [...sortedMenuItems]
      });
    });
  }

  sortMenuItems(menuItems) {
    return menuItems.sort((menuItem1, menuItem2) => {
      if (!menuItem2.id) {
        return -1;
      }
      if (menuItem1.name < menuItem2.name) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  menuHasChanges() {
    const menu = this.state.menu;
    const savedMenu = this.state.savedMenu;
    if (!savedMenu) {
      return false;
    }

    if (menu.title === savedMenu.title) {
      return false;
    }

    return true;
  }

  menuHasAllRequiredFields() {
    return !!this.state.menu.title;
  }

  menuItemHasChanges(menuItem, menuItemIndex) {
    const savedMenuItem = this.state.savedMenuItems[menuItemIndex];
    if (!menuItem.id) {
      return true;
    }

    if (!savedMenuItem) {
      return false;
    }

    if (
      menuItem.name === savedMenuItem.name &&
      menuItem.description === savedMenuItem.description &&
      menuItem.inventory === savedMenuItem.inventory &&
      menuItem.price === savedMenuItem.price
    ) {
      return false;
    }

    return true;
  }

  menuItemHasAllRequiredFields(menuItem) {
    return (
      !!menuItem.name &&
      !!menuItem.inventory &&
      !!menuItem.price &&
      !!menuItem.description
    );
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
          const sortedMenuItems = this.sortMenuItems(menuItems);
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
        menuItems = this.sortMenuItems(menuItems);
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
        menuItems = this.sortMenuItems(menuItems);
        savedMenuItems = this.sortMenuItems(savedMenuItems);
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
            isEmptyMenu={!this.state.menuItems.length}
            menuHasChanges={this.menuHasChanges}
            menuHasAllRequiredFields={this.menuHasAllRequiredFields}
            saveMenu={this.saveMenu}
            cancelMenuEdit={this.cancelMenuEdit}
            deleteMenu={this.deleteMenu}
          />
        </div>
        {this.props.match.params.id === 'new' || (
          <MenuItems
            menuItems={this.state.menuItems}
            updateMenuItem={this.updateMenuItem}
            menuItemHasChanges={this.menuItemHasChanges}
            menuItemHasAllRequiredFields={this.menuItemHasAllRequiredFields}
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

export default withRouter(Menu);
