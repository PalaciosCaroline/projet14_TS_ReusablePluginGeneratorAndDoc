import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home', () => {
  test('renders welcome message', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const h1 = screen.getByText('Welcome to HRnet Service !');
    const addEmployeeLink = screen.getByText('Add a new employee');
    const listEmployeesLink = screen.getByText("View the employees's list");
    expect(h1).toBeInTheDocument();
    expect(addEmployeeLink).toBeInTheDocument();
    expect(listEmployeesLink).toBeInTheDocument();
  });
});
