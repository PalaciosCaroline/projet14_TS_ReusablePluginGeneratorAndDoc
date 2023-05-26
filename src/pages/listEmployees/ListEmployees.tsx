import React from 'react';
import { useSelector } from 'react-redux';
import TableEmployees from '../../components/TableEmployees';
import { Header } from '../../components/Header';
import { linkNewEmployee } from './../../utils/linkData';

export default function ListEmployees(): JSX.Element {
  const employees = useSelector((state: any) => state.employees);

  return (
    <>
      <Header linkProps={linkNewEmployee} />

      <main className="main_ListEmployees" data-testid="listEmployees">
        <TableEmployees employees={employees} />
      </main>
    </>
  );
}
