import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid/v4';
import style from './Menu.module.scss';
import MenuButtons from '../MenuButtons/MenuButtons';
import MenuItems from '../MenuItems/MenuItems';
import Expresso from '../../utils/Expresso';
import { sortMenuItems } from '../../utils/sort';
import {
  clearMenu,
  fetchMenu,
  fetchMenuItems,
  updateMenuTitle
} from '../../actions';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.updateMenuItem = this.updateMenuItem.bind(this);
    this.addMenuItem = this.addMenuItem.bind(this);
    this.saveMenuItem = this.saveMenuItem.bind(this);
    this.cancelMenuItemEdit = this.cancelMenuItemEdit.bind(this);
    this.deleteMenuItem = this.deleteMenuItem.bind(this);
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
    const { currentMenu, currentMenuItems, updateMenuTitle } = this.props;

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
        {this.props.match.params.id === 'new' || (
          <MenuItems
            menuItems={currentMenuItems}
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
  cachedMenu: state.menus.cachedMenu,
  currentMenuItems: state.menuItems.currentMenuItems
});

export default connect(
  mapStateToProps,
  { clearMenu, fetchMenu, fetchMenuItems, updateMenuTitle }
)(withRouter(Menu));
