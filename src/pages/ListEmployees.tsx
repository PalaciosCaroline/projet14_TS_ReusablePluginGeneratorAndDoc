import React from 'react';
import { useSelector } from 'react-redux';
import TableEmployees from '../components/TableEmployees';
import { Header } from '../components/Header';
import { linkNewEmployee } from '../utils/linkData';
import errorLoading from './../assets/errorLoading.jpg';
import { RootState } from '../store/index';

export default function ListEmployees(): JSX.Element {
  const employees = useSelector((state: RootState) => state.employees.active);
 
  return (
    <>
      <Header linkProps={linkNewEmployee} />
      <main className="main_ListEmployees" data-testid="listEmployees">
        {employees ? (
          <TableEmployees employees={employees} />
        ) : (
          <>
            <h1 className="titleErrorLoading">
              Sorry, there was a problem loading the employee data. Please try
              again later.
            </h1>
            <div className="box_imgErrorLoading">
              <img src={errorLoading} alt="image de bobine emmélée" />
            </div>
          </>
        )}
      </main>
    </>
  );
}
