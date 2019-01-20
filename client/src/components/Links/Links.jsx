import React from 'react';
import { Link } from 'react-router-dom';
import style from './Links.module.scss';

export const MenuLinks = ({ menus }) => {
  return menus.map(menu => {
    return (
      <Link to={`/menus/${menu.id}`} className={style.menuLink} key={menu.id}>
        <h3>{menu.title}</h3>
      </Link>
    );
  });
};

export const EmployeeLinks = ({ employees }) => {
  return employees.map(employee => {
    return (
      <Link
        to={`/employees/${employee.id}`}
        className={style.employeeLink}
        key={employee.id}
      >
        <h3>{employee.name}</h3>
      </Link>
    );
  });
};
