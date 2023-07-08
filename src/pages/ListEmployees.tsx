import React from 'react';
import TableEmployees from '../components/TableEmployees';
import { Header } from '../components/Header';
import { linkNewEmployee } from '../utils/linkData';

export default function ListEmployees(): JSX.Element {
  
  return (
    <>
      <Header linkProps={linkNewEmployee} />
      <main className="main_ListEmployees" data-testid="listEmployees">
          <TableEmployees  />
      </main>
    </>
  );
}
