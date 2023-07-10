import React from 'react';
import TableEmployees from '../components/TableEmployees';
import { Header } from '../components/Header';
import { linkNewEmployee } from '../utils/linkData';

/**
 * ListEmployees is a functional component that represents the page for listing employees.
 * It renders the header and the main content section with the employee table.
 *
 * @returns {JSX.Element} A JSX element representing the ListEmployees component.
 */
export default function ListEmployees(): JSX.Element {
  return (
    <>
      <Header linkProps={linkNewEmployee} />
      <main className="main_ListEmployees" data-testid="listEmployees">
        <TableEmployees />
      </main>
    </>
  );
}
