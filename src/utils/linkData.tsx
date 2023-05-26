import React from 'react';
import { FaUserPlus, FaUsers } from 'react-icons/fa';

export const linkNewEmployee = {
  path: '/newemployee',
  className: 'linkNewEmployee',
  icon: <FaUserPlus className='iconLink'/>,
  text:'Add New Employee'
}

export const linkCurrentEmployees = {
  path: '/listemployees',
  className: 'linkListEmployee',
  icon: <FaUsers className='iconLink'/>,
  text:'View Current Employees'
}