import React, { FC, memo } from 'react';
import { dataColumnsMock } from '../mocks/data';
import {Table} from 'table-component-library';
//import {Table} from 'typescript-table'

interface Props {
  employees: any[];
  styles?: any;
}


const EmployeeTable: FC<Props> = memo(({ employees }) => {

  return (
    <div className='box_table'>
      <h1>List of employees</h1>
      <Table data={employees} columns={dataColumnsMock}/>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.employees === nextProps.employees ;
});

export default EmployeeTable;

