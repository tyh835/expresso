import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MenuLinks, EmployeeLinks } from '../Links/Links';
import {
  clearMenu,
  clearMenuItems,
  fetchMenuList,
  fetchEmployeeList
} from '../../actions';
import style from './Landing.module.scss';

class Landing extends Component {
  componentDidMount() {
    this.props.clearMenu();
    this.props.clearMenuItems();
    this.props.fetchMenuList();
    this.props.fetchEmployeeList();
  }

  render() {
    return (
      <div className={style.container}>
        <h2 className={style.heading}>MANAGE MENUS</h2>
        <div className={style.itemContainer}>
          <MenuLinks menus={this.props.menuList} />
        </div>
        <Link to="/menus/new" className={style.addButton}>
          Add
        </Link>
        <h2 className={style.heading}>MANAGE EMPLOYEES</h2>
        <div className={style.itemContainer}>
          <EmployeeLinks employees={this.props.employeeList} />
        </div>
        <Link to="/employees/new" className={style.addButton}>
          Add
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menuList: state.menus.menuList,
  employeeList: state.employees.employeeList
});

export default connect(
  mapStateToProps,
  { clearMenu, clearMenuItems, fetchMenuList, fetchEmployeeList }
)(Landing);
