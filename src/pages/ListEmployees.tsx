import React from 'react';
import { useSelector } from 'react-redux';
import TableEmployees from '../components/TableEmployees';
import { Header } from '../components/Header';
import { linkNewEmployee } from '../utils/linkData';
import { RootState } from '../store/index';

export default function ListEmployees(): JSX.Element {
  const employees = useSelector((state: RootState) => state.employees.active);
  return (
    <>
      <Header linkProps={linkNewEmployee} />
      <main className="main_ListEmployees" data-testid="listEmployees">
        <TableEmployees employees={employees} />
      </main>
    </>
  );
}
