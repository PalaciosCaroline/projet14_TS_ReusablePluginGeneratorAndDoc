import React from 'react';
import { FaUserPlus, FaUsers } from 'react-icons/fa';

export const linkNewEmployee = {
  path: '/newemployee',
  name: 'linkNewEmployee',
  icon: <FaUserPlus className='iconLink'/>,
  text:'Add New Employee'
}

export const linkCurrentEmployees = {
  path: '/listemployees',
  name: 'linkListEmployee',
  icon: <FaUsers className='iconLink'/>,
  text:'View Current Employees'
}