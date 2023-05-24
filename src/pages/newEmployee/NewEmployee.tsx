import React from 'react';
import FormNewEmployee from '../../components/FormNewEmployee';
import { NavLink } from 'react-router-dom';
import logoHRnet from './../../assets/logoHRnet_bg.png';
import { FaUsers } from 'react-icons/fa';

export default function NewEmployee(): JSX.Element {
  return (
    <>
      <header className="header_ListEmployees" data-testid="header_newEmployee">
        <div className="box_logoService">
          <img src={logoHRnet} alt="HRnet Logo" />
          <p className="titleService">HRnet</p>
        </div>
        <NavLink
          to="/listemployees"
          className="linkListEmployee"
        >
          <FaUsers className='iconLink'/><span className='textLink'>View Current Employees</span>
        </NavLink>
      </header>
      <main
        className="main_newEmployee containerNewEmployee"
        data-testid="newEmployee"
      >
        <h1>Create Employee</h1>
        <FormNewEmployee />
      </main>
    </>
  );
}
