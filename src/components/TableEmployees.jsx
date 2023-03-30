import React from 'react'
import { columns } from '../mocks/data';
import {Table} from 'table-component-library';

const EmployeeTable = React.memo(({ employees, styles }) => {

  return (
    <div className='box_table'>
      <h1>List of employees</h1>
      <Table data={employees} columns={columns}/>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.employees === nextProps.employees && prevProps.styles === nextProps.styles;
});

export default EmployeeTable;