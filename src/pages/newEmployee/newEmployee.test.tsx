import NewEmployee from './NewEmployee';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import ListEmployees from '../listEmployees/ListEmployees';
import { dataEmployeesMock, dataColumnsMock } from '../../mocks/data';
// import { Employee } from "../../mocks/data";
import { Employee } from '../../store/employeeFormStateSlice';
import newEmployeeEntreeInitialState from '../../store/employeeFormStateSlice';
import { setError, setField } from '../../store/employeeFormStateSlice';

const mockStore = configureStore([]);

// describe('NewEmployee', () => {
//     let store: any;

//     beforeEach(() => {
//       store = mockStore({
//         newEmployeeEntree: newEmployeeEntreeInitialState,
//       });
//     });

//   test('renders NewEmployee component', () => {

//     render(
//         <Provider store={store}>
//             <Router>
//                 <NewEmployee />
//             </Router>
//         </Provider>,
//     );

//     expect(screen.getByTestId('header_newEmployee')).toBeInTheDocument();
//     expect(screen.getByText(/Create Employee/i)).toBeInTheDocument();
//     expect(screen.getByText(/View Current Employees/i)).toBeInTheDocument();
//   });

//   test('should render a header with a logo and a link to add List of employees', () => {

//     render(
//         <Provider store={store}>
//             <Router>
//                 <NewEmployee />
//             </Router>
//         </Provider>,
//     );

//     const logo = screen.getByAltText('HRnet Logo');
//     const title = screen.getByText('HRnet');
//     const link = screen.getByText('View Current Employees');
//     const form = screen.getByTestId('form');

//     expect(logo).toBeInTheDocument();
//     expect(title).toBeInTheDocument();
//     expect(form).toBeInTheDocument();
//     expect(link).toBeInTheDocument();
//     expect(link.getAttribute('href')).toBe('/listemployees');

//     const header = screen.getByTestId('header_newEmployee');

//     expect(header).toHaveClass('header_ListEmployees');
//     expect(screen.getByText(/View Current Employees/i).closest('a')).toHaveAttribute('href', '/listemployees');
//   });
// });

describe('FormNewEmployee', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      employees: dataEmployeesMock,
      newEmployeeEntree: newEmployeeEntreeInitialState,
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router>
          <NewEmployee />
        </Router>
      </Provider>,
    );
  });

  test('should display required error when input fields are empty and form is submitted', async () => {
    fireEvent.submit(screen.getByTestId('form'));

    expect(store.dispatch).toHaveBeenCalledWith(
      setError({ name: 'firstname', message: 'The firstname is required' }),
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      setError({ name: 'lastname', message: 'The lastname is required' }),
    );
  });

  test('should fill out the form and submit it', async () => {
    fireEvent.input(screen.getByLabelText(/First Name/i), {
      target: { value: 'David' },
    });
    fireEvent.input(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Forde' },
    });

    fireEvent.submit(screen.getByTestId('form'));

    expect(store.dispatch).toHaveBeenCalledWith(
      setField({ name: 'firstname', value: 'David' }),
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      setField({ name: 'lastname', value: 'Forde' }),
    );
  });
});
