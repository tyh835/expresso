import React from 'react';
import { Link } from 'react-router-dom';
import style from './EmployeeLinks.module.scss';

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

export default EmployeeLinks;