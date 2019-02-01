import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './Landing.module.scss';
import { MenuLinks, EmployeeLinks } from '../Links/Links';
import {
  clearEmployee,
  clearMenu,
  clearMenuItems,
  clearTimesheets,
  fetchMenuList,
  fetchEmployeeList
} from '../../actions';

class Landing extends Component {
  componentDidMount() {
    this.props.clearEmployee();
    this.props.clearMenu();
    this.props.clearMenuItems();
    this.props.clearTimesheets();
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

Landing.propTypes = {
  clearEmployee: PropTypes.func,
  clearMenu: PropTypes.func,
  clearMenuItems: PropTypes.func,
  clearTimesheets: PropTypes.func,
  fetchMenuList: PropTypes.func,
  fetchEmployeeList: PropTypes.func,
  menuList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    })
  ),
  employeeList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      position: PropTypes.string,
      wage: PropTypes.number,
      isCurrentEmployee: PropTypes.number
    })
  )
};

const mapStateToProps = state => ({
  menuList: state.menus.menuList,
  employeeList: state.employees.employeeList
});

const mapDispatchToProps = {
  clearEmployee,
  clearMenu,
  clearMenuItems,
  clearTimesheets,
  fetchMenuList,
  fetchEmployeeList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
