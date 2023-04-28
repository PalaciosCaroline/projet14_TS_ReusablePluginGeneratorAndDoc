import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import ListEmployees from './ListEmployees';

jest.mock('typescript-table', () => ({
  Table: () => <table />,
}));

const mockStore = configureStore([]);

describe('ListEmployees component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      employees: [
        { firstname: 'John', lastname: 'Doe' },
        { firstname: 'Jane', lastname: 'Holmes' },
      ],
    });
  });

  it('should render a header with a logo and a link to add new employee', () => {
    render(
      <Provider store={store}>
        <Router> 
          <ListEmployees />
        </Router>
      </Provider>,
    );

    const logo = screen.getByAltText('HRnet Logo');
    const title = screen.getByText('HRnet');
    const link = screen.getByText('Add New Employee');
    const table = screen.getByRole('table');

    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(table).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/newemployee');

    const header = screen.getByTestId('header_ListEmployees');

    expect(header).toHaveClass('header_ListEmployees');
    });
});






