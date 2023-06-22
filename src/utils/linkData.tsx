import React from 'react';
import { FaUserPlus, FaUsers } from 'react-icons/fa';

export const linkNewEmployee = {
  path: '/newemployee',
  name: 'linkNewEmployee',
  icon: <FaUserPlus className='iconLink'/>,
  text: <span className='textLink'>Add<br className='br_homeTitle'/> New Employee</span>
}

export const linkCurrentEmployees = {
  path: '/listemployees',
  name: 'linkListEmployee',
  icon: <FaUsers className='iconLink'/>,
  text:<span className='textLink'>View<br className='br_homeTitle'/> Current Employees</span>
}