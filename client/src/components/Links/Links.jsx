import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './Links.module.scss';

const MenuLinks = ({ menus }) => {
  return menus.map(menu => {
    return (
      <Link to={`/menus/${menu.id}`} className={style.menuLink} key={menu.id}>
        <h3>{menu.title}</h3>
      </Link>
    );
  });
};

MenuLinks.propTypes = {
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    })
  ).isRequired
};

const EmployeeLinks = ({ employees }) => {
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

EmployeeLinks.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      position: PropTypes.string,
      wage: PropTypes.number,
      isCurrentEmployee: PropTypes.number
    })
  ).isRequired
};

export { MenuLinks, EmployeeLinks };
