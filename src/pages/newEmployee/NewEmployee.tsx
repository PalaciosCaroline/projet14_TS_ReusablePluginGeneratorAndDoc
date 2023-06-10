import React from 'react';
import { Header } from '../../components/Header';
import { linkCurrentEmployees } from './../../utils/linkData';
import {FormNewEmployee} from '../../components/FormNewEmployee';

export default function NewEmployee(): JSX.Element {
  return (
    <>
      <Header linkProps={linkCurrentEmployees} />
      <main
        className="main_newEmployee containerNewEmployee"
        data-testid="newEmployee"
      >
        <h1>Create Employee</h1>
        <FormNewEmployee />
      </main>
    </>
  );
}
