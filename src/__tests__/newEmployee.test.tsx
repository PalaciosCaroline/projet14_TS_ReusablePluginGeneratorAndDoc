import NewEmployee from '../pages/NewEmployee';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import ListEmployees from '../pages/ListEmployees';
import { dataEmployeesMock, dataColumnsMock } from '../mocks/data';
// import { Employee } from "../../mocks/data";
import { Employee } from '../store/employeeFormStateSlice';
import { initialState } from '../store/employeeFormStateSlice';
import { setError, setField } from '../store/employeeFormStateSlice';
import { addEmployee } from '../store/employeesSlice';
import Modal from '../components/Modal';

const mockStore = configureStore([]);

describe('NewEmployee', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      employees: {
        active: dataEmployeesMock,
      },
      employeeFormState: initialState,
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

    expect(screen.getByTestId('header_test')).toBeInTheDocument();
    expect(screen.getByText(/Create Employee/i)).toBeInTheDocument();
    expect(screen.getByText(/View Current Employees/i)).toBeInTheDocument();
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
    const link = screen.getByText('View Current Employees');
    const form = screen.getByTestId('form');

    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(link).toBeInTheDocument();

    const header = screen.getByTestId('header_test');

    expect(header).toHaveClass('header_ListEmployees');
    expect(
      screen.getByText(/View Current Employees/i).closest('a'),
    ).toHaveAttribute('href', '/listemployees');
  });
});

describe('FormNewEmployee', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      employees: {
        active: dataEmployeesMock,
      },
      employeeFormState: initialState,
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
      setError({ name: 'firstname', message: 'The first name is required' }),
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      setError({ name: 'lastname', message: 'The last name is required' }),
    );
  });

  test('should fill out the form and submit it', async () => {
    fireEvent.input(screen.getByLabelText(/First Name/i), {
      target: { value: 'David' },
    });
    fireEvent.input(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Forde' },
    });
    fireEvent.input(screen.getByLabelText(/Date Of Birth/i), {
      target: { value: '15/02/2000' },
    });
    fireEvent.input(screen.getByLabelText(/Start Date/i), {
      target: { value: '10/02/2023' },
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

describe('Modal', () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = function () {};
  });
  const mockClose = jest.fn();
  const mockSetIsModalOpen = jest.fn();

  const defaultProps = {
    setIsModalOpen: mockSetIsModalOpen,
    isModalOpen: true,
    closeModal: mockClose,
    children: <div>Test Child</div>,
    className: 'test-modal',
    dataTestId: 'modal-test',
    icon: <div>icon</div>,
    title: 'title',
  };

  it('renders the children and close button when opened', () => {
    const { getByRole, getByText } = render(<Modal {...defaultProps} />);

    expect(getByText('Test Child')).toBeInTheDocument();
    expect(
      getByRole('button', { name: /Fermer la fenêtre/i }),
    ).toBeInTheDocument();
  });

  it('calls the closeModal function when the close button is clicked', () => {
    const { getByRole } = render(<Modal {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /Fermer la fenêtre/i }));

    expect(mockClose).toHaveBeenCalled();
  });

  it('calls the closeModal function when Esc key is pressed', () => {
    const { container } = render(<Modal {...defaultProps} />);

    fireEvent.keyDown(container, { key: 'Escape', code: 'Escape' });

    expect(mockClose).toHaveBeenCalled();
  });

  it('focuses on the first focusable element when Tab key is pressed and shift is not held down', () => {
    const { container, getByRole } = render(<Modal {...defaultProps} />);
    const button = getByRole('button', { name: /Fermer la fenêtre/i });

    button.focus();
    fireEvent.keyDown(container, { key: 'Tab', code: 'Tab' });

    expect(button).toHaveFocus();
  });
});
