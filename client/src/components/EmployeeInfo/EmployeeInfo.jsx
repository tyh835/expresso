import React from 'react';
import { connect } from 'react-redux';
import style from './EmployeeInfo.module.scss';
import { updateEmployee } from '../../actions';

const EmployeeInfo = ({ employee, updateEmployee }) => {
  const { isCurrentEmployee, name, position, wage } = employee;

  return (
    <>
      {!isCurrentEmployee && <h3 className={style.strong}>Retired</h3>}
      <p className={style.strong}>
        <span>Name: </span>
        <input onChange={updateEmployee} id="name" value={name} />
      </p>
      <p>
        <span>Positions: </span>
        <input onChange={updateEmployee} id="position" value={position} />
      </p>
      <p>
        <span>Wage ($/hour): </span>
        <input onChange={updateEmployee} id="wage" value={wage} type="number" />
      </p>
    </>
  );
};

const mapStateToProps = state => ({
  employee: state.employees.currentEmployee
});

const mapDispatchToProps = {
  updateEmployee
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeInfo);
