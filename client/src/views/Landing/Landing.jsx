import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './Landing.module.scss';

import { MenuLinks, EmployeeLinks } from '../../components/Links/Links.jsx';
import Expresso from '../../utils/Expresso';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      menus: []
    };
  }

  componentDidMount() {
    Expresso.getMenus().then(menus => {
      if (menus.length) {
        const sortedMenus = this.sortItemNames(menus, 'title');
        this.setState({menus: sortedMenus});
      }
    });

    Expresso.getEmployees().then(employees => {
      if (employees.length) {
        const sortedEmployees = this.sortItemNames(employees, 'name');
        this.setState({employees: sortedEmployees});
      }
    });
  }

  sortItemNames(items, field) {
    return items.sort((item1, item2) => {
      if (item2[field].toLowerCase() < item1[field].toLowerCase()) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  render() {
    return (
      <div className={style.container}>
        <h2 className={style.heading}>MANAGE MENUS</h2>
        <div className={style.itemContainer}>
          <MenuLinks menus={this.state.menus} />
        </div>
        <Link to="/menus/new" className={style.addButton}>Add</Link>
        <h2 className={style.heading}>MANAGE EMPLOYEES</h2>
        <div className={style.itemContainer}>
          <EmployeeLinks employees={this.state.employees} />
        </div>
        <Link to="/employees/new" className={style.addButton}>Add</Link>
      </div>
    );
  }
}

export default Landing;
