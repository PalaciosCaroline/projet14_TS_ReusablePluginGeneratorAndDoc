import React from 'react';
import { NavLink } from 'react-router-dom';
import logoHRnet from './../../assets/logoHRnet_bg.png';
import { FaUserPlus, FaUsers} from 'react-icons/fa';

export default function Home(): JSX.Element {
  return (
    <main className="box_home" data-testid="home">
      <img src={logoHRnet} alt="" className="logoHome" />
      <h1 data-testid="title_home">Welcome to HRnet Service !</h1>
      <br />
      <nav className="box_navHome">
        <NavLink to="/newemployee" className="linkNewEmployee">
        <FaUserPlus className='iconLink'/><span className='textLink'>Add New Employee</span>
        </NavLink>
        <NavLink
          to="/listemployees"
          className="linkNewEmployee linkListEmployee"
        >
          <FaUsers className='iconLink'/><span className='textLink'>View Current Employees</span>
        </NavLink>
      </nav>
    </main>
  );
}
