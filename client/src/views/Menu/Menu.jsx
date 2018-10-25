import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './Menu.scss';

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
      const sortedMenuItems = this.sortMenuItems(menuItems);
      this.setState({
        menuItems: sortedMenuItems,
        savedMenuItems: [
          ...sortedMenuItems
        ]
      });
    });
  }

  sortMenuItems(menuItems) {
    return menuItems.sort((menuItem1, menuItem2) => {
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

    if (menuItem.name === savedMenuItem.name &&
        menuItem.description === savedMenuItem.description &&
        menuItem.inventory === savedMenuItem.inventory &&
        menuItem.price === savedMenuItem.price) {
      return false;
    }

    return true;
  }

  menuItemHasAllRequiredFields(menuItem) {
    return !!menuItem.name
        && !!menuItem.inventory
        && !!menuItem.price
        && !!menuItem.description;
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
      }
    });
  }

  updateMenuItem(e, menuItemIndex) {
    const type = e.target.id;
    const newValue = e.target.value;
    this.setState(state => {
      state.menuItems[menuItemIndex] = {
        ...state.menuItems[menuItemIndex],
        [type]: newValue
      }
      return {
        ...state,
        menuItems: state.menuItems
      }
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
            savedMenuItems: [
              ...sortedMenuItems
            ]
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
      }
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
    const newMenuItem = {
      name: '',
      description: '',
      inventory: 0,
      price: 0
    };

    this.setState(state => {
      return {
        menuItems: [
          ...state.menuItems,
          newMenuItem
        ]
      }
    });
  }

  saveMenuItem(menuItemIndex) {
    if (this.state.menuItems[menuItemIndex].id) {
      Expresso.updateMenuItem(this.state.menuItems[menuItemIndex], this.state.menu.id)
        .then(newMenuItem => {
          let menuItems = this.state.menuItems.map((menuItem, i) => i === menuItemIndex ? newMenuItem : menuItem);
          menuItems = this.sortMenuItems(menuItems);
          this.setState({
            menuItems,
            savedMenuItems: [
              ...menuItems
            ]
          });
        });
    } else {
      Expresso.createMenuItem(this.state.menuItems[menuItemIndex], this.state.menu.id)
        .then(newMenuItem => {
          let menuItems = this.state.menuItems.map((menuItem, i) => i === menuItemIndex ? newMenuItem : menuItem);
          let savedMenuItems = this.state.savedMenuItems.map((menuItem, i) => i === menuItemIndex ? newMenuItem : menuItem);
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
        }
      });
    }
  }

  deleteMenuItem(menuItemIndex) {
    const menuItem = this.state.menuItems[menuItemIndex];
    if (!menuItem.id) {
      this.setState(state => {
        return {
          menuItems: state.menuItems.filter((_, i) => i !== menuItemIndex),
          savedMenuItems: state.savedMenuItems.filter((_, i) => i !== menuItemIndex)
        }
      });
    } else {
      Expresso.deleteMenuItem(menuItem.id, this.state.menu.id).then(() => {
        this.setState(state => {
          return {
            menuItems: state.menuItems.filter((_, i) => i !== menuItemIndex),
            savedMenuItems: state.savedMenuItems.filter((_, i) => i !== menuItemIndex)
          }
        });
      });
    }
  }

  renderMenuButtons() {
    let saveButton, cancelButton, deleteButton;

    if (this.menuHasChanges() && this.menuHasAllRequiredFields()) {
      saveButton =<button className="button" onClick={this.saveMenu}>Save</button>;
    } else {
      saveButton = <button className="button--inactive">Save</button>;
    }

    if (this.menuHasChanges()) {
      cancelButton =<button className="button" onClick={this.cancelMenuEdit}>Cancel</button>
    } else {
      cancelButton = <button className="button--inactive">Cancel</button>;
    }

    if (!this.state.menuItems.length) {
      deleteButton = <button className="button--delete" onClick={this.deleteMenu}>Delete</button>;
    } else {
      deleteButton = '';
    }

    return (
      <div>
        {saveButton}
        {cancelButton}
        {deleteButton}
      </div>
    )
  }

  renderMenuItemButtons(menuItem, menuItemIndex) {
    let saveButton, cancelButton, deleteButton;

    if (this.menuItemHasChanges(menuItem, menuItemIndex) && this.menuItemHasAllRequiredFields(menuItem)) {
      saveButton =<button className="button" onClick={this.saveMenuItem.bind(this, menuItemIndex)}>Save</button>;
    } else {
      saveButton = <button className="button--inactive">Save</button>;
    }

    if (this.menuItemHasChanges(menuItem, menuItemIndex)) {
      cancelButton =<button className="button" onClick={this.cancelMenuItemEdit.bind(this, menuItemIndex)}>Cancel</button>
    } else {
      cancelButton = <button className="button--inactive">Cancel</button>;
    }

    deleteButton = <button className="button--delete" onClick={this.deleteMenuItem.bind(this, menuItemIndex)}>Delete</button>;

    return (
      <div>
        {saveButton}
        {cancelButton}
        {deleteButton}
      </div>
    )
  }

  renderMenuItems() {
    if (this.props.match.params.id === 'new') {
      return '';
    }
    const menuItems = this.state.menuItems.map((menuItem, menuItemIndex) => {
      return (
        <div className="row" key={menuItem.id}>
          <div className="row__item"><input onChange={(e) => this.updateMenuItem(e, menuItemIndex)} id="name" value={menuItem.name}/></div>
          <div className="row__item"><input type="number" onChange={(e) => this.updateMenuItem(e, menuItemIndex)} id="price" value={menuItem.price} /></div>
          <div className="row__item"><input type="number" onChange={(e) => this.updateMenuItem(e, menuItemIndex)} id="inventory" value={menuItem.inventory} /></div>
          <div className="row__item"><input type="text" onChange={(e) => this.updateMenuItem(e, menuItemIndex)} id="description" value={menuItem.description} /></div>
          <div className="row__item">{this.renderMenuItemButtons(menuItem, menuItemIndex)}</div>
        </div>
      );
    });

    return (
      <div className="Menu__table">
        <div className="row row__header">
          <div className="row__item">Name</div>
          <div className="row__item">Price</div>
          <div className="row__item">Inventory</div>
          <div className="row__item">Description</div>
          <div className="row__item"></div>
        </div>
        {menuItems}
      </div>
    );
  }

  render() {
    if (!this.state.menu) {
      return <div className="Menu"></div>
    }
    const menu = this.state.menu;
    return (
      <div className="Menu">
        <div className="Menu__title">
          <input onChange={this.updateMenuTitle} value={menu.title} placeholder="Menu Title" />
          {this.renderMenuButtons()}
        </div>
        {this.renderMenuItems()}
        <button className="button--add" onClick={this.addMenuItem}>Add Menu Item</button>
        <p className="Menu__responsive--warning">Please widen your browser to enable Menu editing.</p>
      </div>
    );
  }
}

export default withRouter(Menu);
