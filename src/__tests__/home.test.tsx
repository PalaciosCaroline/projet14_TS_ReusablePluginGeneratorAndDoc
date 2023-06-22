import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';

describe('Home', () => {
  test('renders welcome message', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    const h1 = screen.getByText('Welcome to HRnet Service !');
    const addEmployeeLink = screen.getByText('Add New Employee');
    const listEmployeesLink = screen.getByText('View Current Employees');
    expect(h1).toBeInTheDocument();
    expect(addEmployeeLink).toBeInTheDocument();
    expect(listEmployeesLink).toBeInTheDocument();
  });
});
