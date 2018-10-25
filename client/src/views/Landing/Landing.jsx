import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Landing.scss';

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

  renderMenus() {
    return this.state.menus.map(menu => {
      return (
        <Link to={`/menus/${menu.id}`}
           className="items__item--menu"
           key={menu.id}>
          <h3>{menu.title}</h3>
        </Link>
      );
    });
  }

  renderEmployees() {
    return this.state.employees.map(employee => {
      return (
        <Link to={`/employees/${employee.id}`}
           className="items__item--employee"
           key={employee.id}>
           <h3>{employee.name}</h3>
        </Link>
      );
    });
  }

  render() {
    return (
      <div className="Landing">
        <h2 className="Landing__heading">MANAGE MENUS</h2>
        <div className="items">
          {this.renderMenus()}
        </div>
        <Link to="/menus/new" className="button">Add</Link>
        <h2 className="Landing__heading">MANAGE EMPLOYEES</h2>
        <div className="items">
          {this.renderEmployees()}
        </div>
        <Link to="/employees/new" className="button">Add</Link>
      </div>
    );
  }
}

export default Landing;
