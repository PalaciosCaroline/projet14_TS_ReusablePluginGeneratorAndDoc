import React from 'react';
import { useSelector } from 'react-redux';
import TableEmployees from '../../components/TableEmployees';
import { NavLink } from 'react-router-dom';
import logoHRnet from './../../assets/logoHRnet_bg.png';
import { FaUserPlus} from 'react-icons/fa';

export default function ListEmployees(): JSX.Element {
  const employees = useSelector((state: any) => state.employees);

  return (
    <>
      <header
        className="header_ListEmployees"
        data-testid="header_ListEmployees"
      >
        <div className="box_logoService">
          <img src={logoHRnet} alt="HRnet Logo" />
          <p className="titleService">HRnet</p>
        </div>
        <NavLink to="/newemployee" className="linkNewEmployee">
        <FaUserPlus className='iconLink'/><span className='textLink'>Add New Employee</span>
        </NavLink>
      </header>
      <main className="main_ListEmployees" data-testid="listEmployees">
        <TableEmployees employees={employees} />
      </main>
    </>
  );
}
