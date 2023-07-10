import React from 'react';
import { Header } from '../components/Header';
import { linkCurrentEmployees } from '../utils/linkData';
import { FormNewEmployee } from '../components/FormNewEmployee';

/**
 * NewEmployee is a functional component that represents the page for creating a new employee.
 * It renders the header, the main content section, and the form for creating the employee.
 *
 * @returns {JSX.Element} A JSX element representing the NewEmployee component.
 */
export default function NewEmployee(): JSX.Element {
  return (
    <>
      <Header linkProps={linkCurrentEmployees} />
      <main
        className="main_newEmployee containerNewEmployee"
        data-testid="newEmployee"
      >
        <h1 className="pageApp_title">Create Employee</h1>
        <FormNewEmployee />
      </main>
    </>
  );
}
