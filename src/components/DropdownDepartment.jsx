import React from 'react'
import {
  setField
} from './../store/newEmployeeEntreeSlice';
import { useDispatch} from 'react-redux';
import Dropdown from './Dropdown';

export default function DropdownDepartment() {
  const dispatch = useDispatch();

  function handleDepartmentSelect(option) {
    dispatch(setField({ name: 'department', option}));
  }

  const departmentOptions = ['Sales', 'Marketing','Engineering','Human Resources','Legal'];

  return (
    <div className='box_department'>
      <p className='p_label'>Department</p>
      <Dropdown
      dropdownLabel='dropdownLabelDepartment'
      placeholder='select a department'
      options={departmentOptions}
      onOptionClick={(option) => handleDepartmentSelect(option)}
      className='selectState'
      style={{ margin: '8px', width:'100%' }}
      />
    </div>
  )
}


