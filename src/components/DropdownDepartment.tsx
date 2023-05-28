import React from 'react';
import { setField } from '../store/newEmployeeEntreeSlice';
import { useDispatch } from 'react-redux';
import Dropdown from './Dropdown';

export default function DropdownDepartment(): JSX.Element {
  const dispatch = useDispatch();

  function handleDepartmentSelect(option: string): void {
    dispatch(setField({ name: 'department', value: option }));
  }

  const departmentOptions: string[] = [
    'Sales',
    'Marketing',
    'Engineering',
    'Human Resources',
    'Legal',
  ];

  return (
    <div className="box_department">
      <p className="p_label">Department</p>
      <Dropdown
        dropdownLabel="dropdownLabelDepartment"
        placeholder="select a department"
        options={departmentOptions}
        onOptionClick={(option: string) => handleDepartmentSelect(option)}
        style={{ margin: '8px', width: '100%' }}
      />
    </div>
  );
}
