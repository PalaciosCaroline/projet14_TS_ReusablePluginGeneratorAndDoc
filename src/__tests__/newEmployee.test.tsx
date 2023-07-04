import NewEmployee from '../pages/NewEmployee';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import ListEmployees from '../pages/ListEmployees';
import { dataEmployeesMock, dataColumnsMock } from '../mocks/data';
import { Employee } from '../store/employeeFormStateSlice';
import { initialState } from '../store/employeeFormStateSlice';
import { initialState as employeesSliceInitial } from '../store/employeesSlice';
import { setError, setField } from '../store/employeeFormStateSlice';
import employeesSlice, { addEmployee } from '../store/employeesSlice';
import Modal from '../components/Modal';
import Dropdown from '../components/Dropdown';
import { isValidName, validateNames } from '../utils/controlName';

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

test('isValidName should return false and call setError with the correct argument when name has invalid format', () => {
  const setError = jest.fn();
  const dispatch = jest.fn();

  const name = 'David@';

  const result = isValidName(name, setError, 'first name', dispatch);

  expect(setError).toHaveBeenCalledWith({
    name: 'firstname',
    message: 'Invalid first name format',
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

describe('Dropdown', () => {
  const options = ['option 1', 'option 2', 'option 3'];

  let getByRole: any, getByText: any;
  let store: any;
  beforeEach(() => {
    store = mockStore({
      employees: {
        active: dataEmployeesMock,
      },
      employeeFormState: initialState,
    });

    const renderResult = render(
      <Provider store={store}>
        <Dropdown
          label="State"
          dropdownLabel="dropdownLabelState"
          placeholder="select a state"
          options={options}
          style={{ margin: '8px', width: '100%' }}
        />
      </Provider>,
    );

    getByRole = renderResult.getByRole;
    getByText = renderResult.getByText;
  });

  test('Opens and closes the dropdown menu by clicking the button', () => {
    const dropdownButton = getByRole('button');

    fireEvent.click(dropdownButton);
    expect(getByRole('listbox')).toBeVisible();

    fireEvent.click(dropdownButton);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('Closes the dropdown menu by pressing the Tab key.', () => {
    const dropdownButton = getByRole('button');

    fireEvent.click(dropdownButton);
    expect(getByRole('listbox')).toBeVisible();

    fireEvent.keyDown(dropdownButton, { key: 'Tab', code: 'Tab' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('Changes the selected option by pressing the Enter key.', () => {
    const dropdownButton = getByRole('button');

    fireEvent.click(dropdownButton);
    const option1 = getByText('option 1');
    fireEvent.keyDown(option1, { key: 'Enter', code: 'Enter' });
    expect(getByRole('button')).toHaveTextContent('option 1');
  });
});

const { reducer, actions } = employeesSlice;

describe('employeesSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(employeesSliceInitial);
  });

  test('should handle setLoading', () => {
    const action = actions.setLoading(true);
    const expectedState = { ...employeesSliceInitial, isLoading: true };
    expect(reducer(employeesSliceInitial, action)).toEqual(expectedState);
  });

  // Ajoutez plus de tests pour les autres actions ici

  test('should handle addEmployee when employee does not exist', () => {
    const newEmployee = {
      firstname: 'John',
      lastname: 'Dort',
      dateOfBirth: '15/01/1975',
      startDate: '01/04/2022',
      department: 'Sales',
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
    };
    const action = actions.addEmployee(newEmployee);
    const expectedState = {
      ...employeesSliceInitial,
      active: [...employeesSliceInitial.active, { ...newEmployee, id: 22 }],
    };
    expect(reducer(employeesSliceInitial, action)).toEqual(expectedState);
  });

  test('should handle addEmployee when employee does not exist', () => {
    const existingEmployee = {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      dateOfBirth: '15/01/1975',
      startDate: '01/04/2022',
      department: 'Sales',
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
    };

    const initialStateWithExistingEmployee = {
      ...employeesSliceInitial,
      active: [...employeesSliceInitial.active, existingEmployee],
    };

    const action = actions.addEmployee(existingEmployee);
    const expectedState = {
      ...initialStateWithExistingEmployee,
      errorEmployeeExist: 'Employee already exists',
    };

    expect(reducer(initialStateWithExistingEmployee, action)).toEqual(
      expectedState,
    );
  });
});

test('should handle deleteEmployee', () => {
  const employeeIdToDelete = 0;

  // Ajouter un employé existant à l'état initial
  const initialStateWithExistingEmployee = {
    ...employeesSliceInitial,
    active: [
      ...employeesSliceInitial.active,
      {
        firstname: 'John',
        lastname: 'Dort',
        dateOfBirth: '15/01/1975',
        startDate: '01/04/2022',
        department: 'Sales',
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        id: employeeIdToDelete,
      },
    ],
  };

  const action = actions.deleteEmployee(employeeIdToDelete);

  const expectedState = {
    ...initialStateWithExistingEmployee,
    active: employeesSliceInitial.active,
  };

  expect(reducer(initialStateWithExistingEmployee, action)).toEqual(
    expectedState,
  );
});

test('should handle archiveEmployee', () => {
  const employeeIdToArchive = 0;
  const endDate = '04/06/2023';

  const initialStateWithExistingEmployee = {
    ...employeesSliceInitial,
    active: [
      ...employeesSliceInitial.active,
      {
        firstname: 'John',
        lastname: 'Dort',
        dateOfBirth: '15/01/1975',
        startDate: '01/04/2022',
        department: 'Sales',
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        id: employeeIdToArchive,
      },
    ],
  };

  const action = actions.archiveEmployee({
    id: employeeIdToArchive,
    endDate: endDate,
  });

  const expectedState = {
    ...initialStateWithExistingEmployee,
    active: employeesSliceInitial.active,
    archived: [
      ...employeesSliceInitial.archived,
      {
        ...initialStateWithExistingEmployee.active.find(
          (e) => e.id === employeeIdToArchive,
        ),
        endDate: endDate,
      },
    ],
  };

  expect(reducer(initialStateWithExistingEmployee, action)).toEqual(
    expectedState,
  );
});
