import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './Menu.module.scss';
import MenuButtons from '../MenuButtons/MenuButtons';
import MenuItems from '../MenuItems/MenuItems';
import {
  addMenuItem,
  clearMenu,
  fetchMenu,
  fetchMenuItems,
  updateMenuTitle
} from '../../actions';

class Menu extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id === 'new') {
      return this.props.clearMenu();
    } else {
      this.props.fetchMenu(id);
      this.props.fetchMenuItems(id);
    }
  }

  render() {
    const { addMenuItem, menuTitle, updateMenuTitle } = this.props;
    const navigate = this.props.history.push;
    const menuId = this.props.match.params.id;

    return (
      <div className={style.container}>
        <div className={style.menuName}>
          <input
            onChange={e => updateMenuTitle(e)}
            value={menuTitle}
            placeholder="Menu Title"
          />
          <MenuButtons navigate={navigate} />
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

Menu.propTypes = {
  addMenuItem: PropTypes.func,
  clearMenu: PropTypes.func,
  fetchMenu: PropTypes.func,
  fetchMenuItems: PropTypes.func,
  updateMenuTitle: PropTypes.func,
  menuTitle: PropTypes.string
};

const mapStateToProps = state => ({
  menuTitle: state.menus.currentMenu.title
});

const mapDispatchToProps = {
  addMenuItem,
  clearMenu,
  fetchMenu,
  fetchMenuItems,
  updateMenuTitle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Menu));
