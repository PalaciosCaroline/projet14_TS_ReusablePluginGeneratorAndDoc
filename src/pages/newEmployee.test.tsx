
import NewEmployee from './NewEmployee';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import { render, screen,  fireEvent, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import ListEmployees from './ListEmployees';
import { dataEmployeesMock, dataColumnsMock } from '../mocks/data';
import { Employee } from "../mocks/data";

const mockStore = configureStore([]);

describe('NewEmployee', () => {
    let store: any;

    beforeEach(() => {
      store = mockStore({
        employees: dataEmployeesMock
      });
    });

  test('renders NewEmployee component', () => {
    render(
        <Provider store={store}>
            <Router>
                <NewEmployee />
            </Router>
        </Provider>,
    );

    expect(screen.getByTestId('newEmployee')).toBeInTheDocument();
    expect(screen.getByText(/Create Employee/i)).toBeInTheDocument();
    expect(screen.getByText(/List of current employees/i)).toBeInTheDocument();
  });

  test('should render a header with a logo and a link to add List of employees', () => {
    render(
        <Provider store={store}>
            <Router>
                <NewEmployee />
            </Router>
        </Provider>,
    );

    const logo = screen.getByAltText('HRnet Logo');
    const title = screen.getByText('HRnet');
    const link = screen.getByText('List of current employees');
    const form = screen.getByRole('form');

    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/listEmployees');

    const header = screen.getByTestId('header_newEmployee');

    expect(header).toHaveClass('header_ListEmployees');
    expect(screen.getByText(/List of current employees/i).closest('a')).toHaveAttribute('href', '/listemployees');
  });
});