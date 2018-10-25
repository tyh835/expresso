import React from 'react';
import { Link } from 'react-router-dom';
import style from './LinkItems.module.scss';

const MenuLinks = ({ menus }) => {
  return menus.map(menu => {
    return (
      <Link to={`/menus/${menu.id}`}
         className={style.menuItem}
         key={menu.id}>
        <h3>{menu.title}</h3>
      </Link>
    );
  });
};

const EmployeeLinks = ({ employees }) => {
  return employees.map(employee => {
    return (
      <Link to={`/employees/${employee.id}`}
         className={style.employeeItem}
         key={employee.id}>
         <h3>{employee.name}</h3>
      </Link>
    );
  });
}

export {
  MenuLinks,
  EmployeeLinks
};