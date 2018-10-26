import React from 'react';
import style from './EmployeeInfo.module.scss';

const EmployeeInfo = ({
  employee,
  updateEmployee
}) => {
  return (
    <>
      {!employee.isCurrentEmployee && <h3 className={style.strong}>Retired</h3>}
      <p className={style.strong}><span>Name: </span><input onChange={updateEmployee} id="name" value={employee.name} /></p>
      <p><span>Positions: </span><input onChange={updateEmployee} id="position" value={employee.position} /></p>
      <p><span>Wage ($/hour): </span><input onChange={updateEmployee} id="wage" value={employee.wage} type="number" /></p>
    </>
  )
}

export default EmployeeInfo;
