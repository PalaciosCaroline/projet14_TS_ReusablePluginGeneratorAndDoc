/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as reactRedux from 'react-redux';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByTestId,
  getAllByTestId,
} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import ListEmployees from '../pages/ListEmployees';
import {
  dataEmployeesMock,
  dataColumnsMock,
  EmployeeBase,
} from '../mocks/data';
import { Employee } from '../mocks/data';
import {
  handleArchiveEmployee,
  handleChangeEmployee,
  handleDeleteEmployee,
} from '../services/employeeService';
import employeesSlice, {
  addEmployee,
  archiveEmployee,
  deleteEmployee,
  initialState,
  setLoading,
  updateEmployee,
} from '../store/employeesSlice';
import { setError, setEmployeeData } from '../store/employeeFormStateSlice';
import DeleteEmployeeContent from './../components/DeleteEmployeeContent';
import ArchiveEmployeeContent from '../components/ArchiveEmployeeContent';
import EditEmployeeContent from '../components/EditEmployeeContent';
import ModalEmployeesContent from '../components/ModalEmployeesContent';

const mockStore = configureStore([]);

describe('ListEmployees component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      employees: {
        active: dataEmployeesMock,
      },
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

    const header = screen.getByTestId('header_test');

    expect(header).toHaveClass('header_ListEmployees');
  });
});

describe('table component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      employees: {
        active: dataEmployeesMock,
      },
    });
  });

  it('renders table header and data correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <ListEmployees />
        </Router>
      </Provider>,
    );

    // Vérifiez que chaque en-tête de colonne est présent
    dataColumnsMock.forEach((column) => {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    });

    // Vérifiez que chaque donnée est présente
    const table = screen.getByRole('table');
    // eslint-disable-next-line testing-library/no-node-access
    const rows = table.querySelectorAll('tbody > tr');
    // eslint-disable-next-line testing-library/no-node-access
    const cells = rows[0].querySelectorAll('td');
    expect(cells).toHaveLength(dataColumnsMock.length + 2);
    expect(cells[1]).toHaveTextContent('John');
    expect(cells[2]).toHaveTextContent('Doe');
    expect(cells[3]).toHaveTextContent('01/04/2022');
  });
});

describe('Table features', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      employees: {
        active: dataEmployeesMock,
      },
    });
  });

  test('hides column when isVisible is set to false', async () => {
    render(
      <Provider store={store}>
        <Router>
          <ListEmployees />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Street')).toBeInTheDocument();
    const btnManageTable = screen.getByTestId('manageTable');
    fireEvent.click(btnManageTable);
    fireEvent.click(screen.getByText('Manage Columns'));

    const listItem = screen.getByTestId('inputManaged-department');

    fireEvent.click(listItem);
    fireEvent.click(screen.getByText('Manage Columns'));

    const columnVisible = screen.getByTestId('columnManaged-firstname');
    expect(columnVisible).toBeInTheDocument();
    expect(screen.queryByText('department')).not.toBeInTheDocument();
  });

  test('change perPage value and check if the number of displayed rows changes', () => {
    render(
      <Provider store={store}>
        <Router>
          <ListEmployees />
        </Router>
      </Provider>,
    );

    let displayedRows = screen.getAllByRole('row');
    expect(displayedRows.length).toBe(11);
    // Ouvrir le menu déroulant
    fireEvent.click(screen.getByTestId('manageTable'));
    const btnPerPage = screen.getByTestId('RowPerPage');
    fireEvent.click(btnPerPage);

    const optionElement = screen.getByTestId(`optionPerPage-5`);
    fireEvent.click(optionElement);

    // Vérifier si le nombre de lignes affichées a changé en conséquence
    displayedRows = screen.getAllByRole('row');
    expect(displayedRows.length).toBe(6); // Ajouter 1 pour inclure la ligne d'en-tête
  });

  it('renders a table with the correct data and columns', () => {
    render(
      <Provider store={store}>
        <Router>
          <ListEmployees />
        </Router>
      </Provider>,
    );
    const table = screen.getByRole('table');

    // eslint-disable-next-line testing-library/no-node-access
    const headers = table.querySelectorAll('th');
    expect(headers).toHaveLength(dataColumnsMock.length + 2);
    headers.forEach((header: any, index: number) => {
      if (index === 0 || index === headers.length - 1) return;
      expect(header).toHaveTextContent(dataColumnsMock[index - 1].label);
    });

    // eslint-disable-next-line testing-library/no-node-access
    const rows = table.querySelectorAll('tbody > tr');
    expect(rows).toHaveLength(10);

    rows.forEach((row, rowIndex) => {
      // eslint-disable-next-line testing-library/no-node-access
      const cells = row.querySelectorAll('td');
      expect(cells).toHaveLength(dataColumnsMock.length + 2);
      cells.forEach((cell: any, cellIndex: number) => {
        if (cellIndex === 0 || cellIndex === cells.length - 1) return;
        const employeeProperty: string =
          dataColumnsMock[cellIndex - 1].property;
        expect(cell).toHaveTextContent(
          String(
            dataEmployeesMock[rowIndex][employeeProperty as keyof Employee],
          ),
        );
      });
    });
  });

  test('sorts the table by the ascendant firstname column', () => {
    render(
      <Provider store={store}>
        <Router>
          <ListEmployees />
        </Router>
      </Provider>,
    );
    const firstNameHeader = screen.getByTestId('btnSortByAsc-firstname');
    fireEvent.click(firstNameHeader);

    const sortedData = dataEmployeesMock
      .slice()
      .sort((a, b) => a.firstname.localeCompare(b.firstname));
    const table = screen.getByRole('table');
    const rows = table.querySelectorAll('tbody > tr');
    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('td');
      expect(cells[1]).toHaveTextContent(
        sortedData[rowIndex].firstname.toString(),
      );
    });
  });

  test('sorts the table by descendant the firstname column', () => {
    render(
      <Provider store={store}>
        <Router>
          <ListEmployees />
        </Router>
      </Provider>,
    );
    const firstNameAscHeader = screen.getByTestId('btnSortByAsc-firstname');
    fireEvent.click(firstNameAscHeader);
    const firstNameDescHeader = screen.getByTestId('btnSortbyDesc-firstname');
    fireEvent.click(firstNameDescHeader);

    const sortedData = dataEmployeesMock
      .slice()
      .sort((a, b) => b.firstname.localeCompare(a.firstname));
    const table = screen.getByRole('table');
    const rows = table.querySelectorAll('tbody > tr');
    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('td');

      expect(cells[1]).toHaveTextContent(
        sortedData[rowIndex].firstname.toString(),
      );
    });
  });

  test('sorts the table by the dateOfBirth column', () => {
    render(
      <Provider store={store}>
        <Router>
          <ListEmployees />
        </Router>
      </Provider>,
    );

    const dateOfBirthHeader = screen.getByTestId('btnSortByAsc-dateOfBirth');
    fireEvent.click(dateOfBirthHeader);

    const sortedData = dataEmployeesMock.slice().sort((a, b) => {
      const datePartsA = a.dateOfBirth.split('/').map(Number);
      const datePartsB = b.dateOfBirth.split('/').map(Number);
      const dateA = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0]);
      const dateB = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0]);
      return dateA.valueOf() - dateB.valueOf();
    });

    const table = screen.getByRole('table');
    const rows = table.querySelectorAll('tbody > tr');
    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('td');
      expect(cells[5]).toHaveTextContent(
        sortedData[rowIndex].dateOfBirth.toString(),
      );
    });
  });

  test('sorts the table by the ascendant dateOfBirth column', async () => {
    render(
      <Provider store={store}>
        <Router>
          <ListEmployees />
        </Router>
      </Provider>,
    );
    const dateOfBirthHeader = screen.getByTestId('btnSortByAsc-dateOfBirth');
    fireEvent.click(dateOfBirthHeader);
    await waitFor(() => {
      const dateOfBirthHeaderDesc = screen.getByTestId(
        'btnSortbyDesc-dateOfBirth',
      );
      fireEvent.click(dateOfBirthHeaderDesc);
    });

    const sortedDataDesc = dataEmployeesMock.slice().sort((a, b) => {
      const datePartsA = a.dateOfBirth.split('/').map(Number);
      const datePartsB = b.dateOfBirth.split('/').map(Number);
      const dateA = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0]);
      const dateB = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0]);
      return dateB.valueOf() - dateA.valueOf();
    });
    const table = screen.getByRole('table');
    const rows = table.querySelectorAll('tbody > tr');
    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('td');
      expect(cells[5]).toHaveTextContent(
        sortedDataDesc[rowIndex].dateOfBirth.toString(),
      );
    });
  });

  test('Search by property functionality works correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <ListEmployees />
        </Router>
      </Provider>,
    );

    // Trigger the onChange event on the general search input with a search term
    const searchByFirstname = screen.getByTestId('btnOpenSearch-firstname');
    fireEvent.click(searchByFirstname);
    fireEvent.change(screen.getByTestId('btnSearch-firstname'), {
      target: { value: 'Jo' },
    });

    // Check that expected elements are present and unexpected elements are absent
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('15/01/1975')).toBeInTheDocument();
    expect(screen.queryByText('Joce')).toBeInTheDocument();
    expect(screen.queryByText('30/04/1983')).toBeInTheDocument();
    expect(screen.queryByText('Jane')).not.toBeInTheDocument();

    fireEvent.change(screen.getByTestId('btnSearch-firstname'), {
      target: { value: 'Joh' },
    });
    expect(screen.queryByText('John')).toBeInTheDocument();
    expect(screen.queryByText('Johnson')).not.toBeInTheDocument();
    expect(screen.queryByText('Joce')).not.toBeInTheDocument();

    const resetButton = screen.getByTestId('btnResetClose-firstname');
    fireEvent.click(resetButton);

    expect(screen.queryByText('Jane')).toBeInTheDocument();
  });

  test('general search functionality works correctly', async () => {
    render(
      <Provider store={store}>
        <Router>
          <ListEmployees />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Sarah')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'J' },
    });

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Sarah')).not.toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'John' },
    });

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('15/01/1975')).toBeInTheDocument();
    expect(screen.getByText('Johnson')).toBeInTheDocument();
    expect(screen.queryByText('Jane')).not.toBeInTheDocument();
  });
});

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

// Mocking actions
jest.mock('../store/employeesSlice', () => ({
  updateEmployee: jest.fn().mockReturnValue('updateEmployee'),
  deleteEmployee: jest.fn().mockReturnValue('deleteEmployee'),
  archiveEmployee: jest.fn().mockReturnValue('archiveEmployee'),
  setLoading: jest.fn().mockReturnValue('setLoading'),
}));

jest.mock('../store/employeeFormStateSlice', () => ({
  setError: jest.fn().mockReturnValue('setError'),
}));

describe('handleChangeEmployee', () => {
  it('should dispatch updateEmployee and setLoading actions', () => {
    const mockDispatch = jest.fn();
    const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
    useDispatchSpy.mockReturnValue(mockDispatch);

    const closeModal = jest.fn();
    const employeeId = 1;
    const employeeFormEntree = { firstname: 'John', lastname: 'Doe' };

    handleChangeEmployee(
      mockDispatch,
      employeeFormEntree,
      closeModal,
      employeeId,
    );

    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
    expect(mockDispatch).toHaveBeenCalledWith(
      updateEmployee({
        id: employeeId,
        ...employeeFormEntree,
        department: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
      }),
    );
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
    expect(closeModal).toHaveBeenCalled();

    // Restores useDispatch to its original implementation
    jest.spyOn(reactRedux, 'useDispatch').mockRestore();
  });
});

describe('handleArchiveEmployee', () => {
  let store: any;
  const mockEmployeeFormState = {
    formValues: {
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
      endDate: '',
    },
    formErrors: {
      errorendDate: '',
    },
  };

  beforeEach(() => {
    store = mockStore({
      employees: {
        active: dataEmployeesMock,
      },
      employeeFormState: mockEmployeeFormState,
    });
  });

  it('should dispatch archiveEmployee and setLoading actions when date is valid', () => {
    const mockDispatch = jest.fn();
    const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
    useDispatchSpy.mockReturnValue(mockDispatch);
    const closeModal = jest.fn();
    const employeeId = 1;
    const employeeFormEntree = { endDate: '2023-12-31' };
    const employeeEntreeErrors = { errorendDate: false };

    handleArchiveEmployee(
      mockDispatch,
      employeeFormEntree,
      closeModal,
      employeeEntreeErrors,
      employeeId,
    );

    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
    expect(mockDispatch).toHaveBeenCalledWith(
      archiveEmployee({ id: employeeId, endDate: employeeFormEntree.endDate }),
    );
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
    expect(closeModal).toHaveBeenCalled();
  });

  it('should dispatch setError action when date is invalid', () => {
    const mockDispatch = jest.fn();
    const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
    useDispatchSpy.mockReturnValue(mockDispatch);
    const closeModal = jest.fn();
    const employeeId = 1;
    const employeeFormEntree = { endDate: '' };
    const employeeEntreeErrors = { errorendDate: true };

    handleArchiveEmployee(
      mockDispatch,
      employeeFormEntree,
      closeModal,
      employeeEntreeErrors,
      employeeId,
    );

    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
    expect(mockDispatch).toHaveBeenCalledWith(
      setError({ name: 'endDate', message: 'errordate' }),
    );
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
    expect(closeModal).not.toHaveBeenCalled();
  });
});

describe('handleDeleteEmployee', () => {
  it('should dispatch deleteEmployee and setLoading actions', () => {
    const mockDispatch = jest.fn();
    const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
    useDispatchSpy.mockReturnValue(mockDispatch);
    const closeModal = jest.fn();
    const employeeId = 1;

    handleDeleteEmployee(mockDispatch, closeModal, employeeId);

    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
    expect(mockDispatch).toHaveBeenCalledWith(deleteEmployee(employeeId));
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
    expect(closeModal).toHaveBeenCalled();
  });
});

describe('DeleteEmployeeContent', () => {
  it('should call handleDeleteSubmit when "Confirm Delete" button is clicked', () => {
    const handleDeleteSubmit = jest.fn();
    const selectedEmployeeId = 1;
    const handleCancel = jest.fn();
    const isLoading = false;

    const { getByTestId } = render(
      <DeleteEmployeeContent
        handleDeleteSubmit={handleDeleteSubmit}
        selectedEmployeeId={selectedEmployeeId}
        handleCancel={handleCancel}
        isLoading={isLoading}
      />,
    );

    const confirmButton = getByTestId('btn_DeleteConfirm');
    fireEvent.click(confirmButton);

    expect(handleDeleteSubmit).toHaveBeenCalledWith(selectedEmployeeId);
  });

  it('should call handleCancel when "Cancel" button is clicked', () => {
    const handleDeleteSubmit = jest.fn();
    const selectedEmployeeId = 1;
    const handleCancel = jest.fn();
    const isLoading = false;

    const { getByTestId } = render(
      <DeleteEmployeeContent
        handleDeleteSubmit={handleDeleteSubmit}
        selectedEmployeeId={selectedEmployeeId}
        handleCancel={handleCancel}
        isLoading={isLoading}
      />,
    );

    const cancelButton = getByTestId('btn_formCancel');
    fireEvent.click(cancelButton);

    expect(handleCancel).toHaveBeenCalled();
  });
});

describe('ArchiveEmployeeContent', () => {
  let store: any;
  const mockEmployeeFormState = {
    formValues: {
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
      endDate: '12/02/2023',
    },
    formErrors: {
      errorendDate: '',
    },
  };

  beforeEach(() => {
    store = mockStore({
      employees: {
        active: dataEmployeesMock,
      },
      employeeFormState: mockEmployeeFormState,
    });
  });

  it('should call handleArchiveSubmit when form is submitted', () => {
    const handleArchiveSubmit = jest.fn();
    const selectedEmployeeId = 1;
    const isLoading = false;

    const { getByTestId } = render(
      <Provider store={store}>
        <ArchiveEmployeeContent
          handleArchiveSubmit={handleArchiveSubmit}
          selectedEmployeeId={selectedEmployeeId}
          isLoading={isLoading}
        />
      </Provider>,
    );

    const btnArchive = getByTestId('btn_formArchive');
    fireEvent.submit(btnArchive);

    expect(handleArchiveSubmit).toHaveBeenCalledWith(selectedEmployeeId);
  });
});

describe('EditEmployeeContent', () => {
  let store: any;
  const mockEmployeeFormState = {
    formValues: {
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
      endDate: '',
    },
    formErrors: {
      errorendDate: '',
    },
  };

  beforeEach(() => {
    store = mockStore({
      employees: {
        active: dataEmployeesMock,
      },
      employeeFormState: mockEmployeeFormState,
    });
  });

  it('should call handleChangeSubmit when form is submitted', () => {
    const handleChangeSubmit = jest.fn();
    const selectedEmployeeId = 1;
    const isLoading = false;

    const { getByTestId } = render(
      <Provider store={store}>
        <EditEmployeeContent
          handleChangeSubmit={handleChangeSubmit}
          selectedEmployeeId={selectedEmployeeId}
          isLoading={isLoading}
        />
      </Provider>,
    );

    const btnEdit = getByTestId('btn_formUpdate');
    fireEvent.submit(btnEdit);

    expect(handleChangeSubmit).toHaveBeenCalledWith(selectedEmployeeId);
  });
});

describe('ModalEmployeesContent', () => {
  let store: any;
  const mockEmployeeFormState = {
    formValues: {
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
      endDate: '',
    },
    formErrors: {
      errorendDate: '',
    },
  };

  beforeEach(() => {
    store = mockStore({
      employees: {
        active: dataEmployeesMock,
      },
      employeeFormState: mockEmployeeFormState,
    });
  });

  it('should render employee data components and modal content based on modalType', () => {
    const modalType = 'EDIT_MODAL';
    const handleSubmit = jest.fn();
    const handleCancel = jest.fn();
    const selectedEmployeeId = 1;
    const isLoading = false;

    const { getByText } = render(
      <Provider store={store}>
        <ModalEmployeesContent
          modalType={modalType}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          selectedEmployeeId={selectedEmployeeId}
          isLoading={isLoading}
          employeeFormEntree={mockEmployeeFormState.formValues}
        />
      </Provider>,
    );

    expect(getByText('First Name:')).toBeInTheDocument();
    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('Last Name:')).toBeInTheDocument();
    expect(getByText('Doe')).toBeInTheDocument();
    expect(getByText('Department')).toBeInTheDocument();
    expect(getByText('Sales')).toBeInTheDocument();
    expect(getByText('Save Changes')).toBeInTheDocument();
  });

  it('should render employee data components and modal content based on other modalType', () => {
    const modalType = 'DELETE_MODAL';
    const handleSubmit = jest.fn();
    const handleCancel = jest.fn();
    const selectedEmployeeId = 1;
    const isLoading = false;

    const { getByText } = render(
      <Provider store={store}>
        <ModalEmployeesContent
          modalType={modalType}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          selectedEmployeeId={selectedEmployeeId}
          isLoading={isLoading}
          employeeFormEntree={mockEmployeeFormState.formValues}
        />
      </Provider>,
    );

    expect(getByText('First Name:')).toBeInTheDocument();
    expect(getByText('John')).toBeInTheDocument();
    expect(getByText('Last Name:')).toBeInTheDocument();
    expect(getByText('Doe')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});





