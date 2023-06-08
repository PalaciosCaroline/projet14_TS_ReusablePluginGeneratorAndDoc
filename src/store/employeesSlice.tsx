import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dataEmployeesMock } from '../mocks/data';

export interface Employee {
  id?: number;
  firstname: string | null;
  lastname: string | null;
  dateOfBirth: string | null;
  startDate: string | null;
  department: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
}

let nextId = 22;

interface EmployeesState {
  active: Employee[];
  archived: Employee[];
}

const initialState: EmployeesState = {
  active: dataEmployeesMock,
  archived: [],
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState: initialState as EmployeesState,
  reducers: {
    // enregistrement de l'idUser à faire et Date
    addEmployee: {
      reducer: (state, action: PayloadAction<Employee>) => {
        state.active.push(action.payload);
      },
      prepare: (employee: Omit<Employee, 'id'>) => {
        return { payload: { ...employee, id: nextId++ } };
      },
    },
    // enregistrement de l'idUser à faire et Date
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.active = state.active.filter(
        (employee) => employee.id !== action.payload,
      );
    },
    // enregistrement de l'idUser à faire et Date
    archiveEmployee: (state, action: PayloadAction<number>) => {
      const index = state.active.findIndex(
        (employee) => employee.id === action.payload,
      );
      if (index !== -1) {
        const [employee] = state.active.splice(index, 1);
        state.archived.push(employee);
      }
    },
  },
});

// export const addEmployee = createAction<Employee>('employees/addEmployee');
export const { addEmployee, deleteEmployee, archiveEmployee } =
  employeesSlice.actions;
export default employeesSlice;
