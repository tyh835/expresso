import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EmployeeLinks from '../../components/EmployeeLinks/EmployeeLinks.jsx';
import MenuLinks from '../../components/MenuLinks/MenuLinks.jsx';
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

  render() {
    return (
      <div className="Landing">
        <h2 className="Landing__heading">MANAGE MENUS</h2>
        <div className="items">
          <MenuLinks menus={this.state.menus} />
        </div>
        <Link to="/menus/new" className="button">Add</Link>
        <h2 className="Landing__heading">MANAGE EMPLOYEES</h2>
        <div className="items">
          <EmployeeLinks employees={this.state.employees} />
        </div>
        <Link to="/employees/new" className="button">Add</Link>
      </div>
    );
  }
}

export default Landing;
