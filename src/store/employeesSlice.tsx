import { createAction, createSlice, PayloadAction,  createAsyncThunk } from '@reduxjs/toolkit';
import { dataEmployeesMock } from '../mocks/data';
import { EmployeeBase } from './../employeeTypes'
import { RootState } from './index';

export interface Employee extends EmployeeBase {
  id: number;
  endDate?: string; 
}

let nextId = 22;

interface EmployeesState {
  active: Employee[];
  archived: Employee[];
  isLoading: boolean;
}

export const initialState: EmployeesState = {
  active: dataEmployeesMock,
  archived: [],
  isLoading: false,
};

interface UpdateEmployeePayload {
  id: number;
  department: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState: initialState as EmployeesState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      // Mise à jour de l'état de chargement en fonction de l'action
      state.isLoading = action.payload;
    },
    // sécurité: enregistrement de l'idUser à faire et Date d'enregistrement
    addEmployee: {
      reducer: (state, action: PayloadAction<Employee>) => {
        state.active.push(action.payload);
      },
      prepare: (employee: EmployeeBase) => {
        return { payload: { ...employee, id: nextId++ } };
      },
    },
    updateEmployee: (state, action: PayloadAction<UpdateEmployeePayload>) => {
      const { id, department, street, city, state: employeeState, zipCode } = action.payload;
      const index = state.active.findIndex((employee) => employee.id === id);
      if (index !== -1) {
        state.active[index].department = department;
        state.active[index].street = street;
        state.active[index].city = city;
        state.active[index].state = employeeState;
        state.active[index].zipCode = zipCode;
      }
    },
    // sécurité: enregistrement de l'idUser à faire et Date d'effacement
    archiveEmployee: (state, action: PayloadAction<{id: number, endDate: string}>) => {
      const { id, endDate } = action.payload;
      const index = state.active.findIndex(
        (employee) => employee.id === id,
      );
      if (index !== -1) {
        const [employee] = state.active.splice(index, 1);
        employee.endDate = endDate;
        state.archived.push(employee);
      }
    },
    // sécurité: enregistrement de l'idUser à faire et Date d'effacement
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.active = state.active.filter(
        (employee) => employee.id !== action.payload,
      );
    },
  },
});

export const checkEmployeeExistence = createAsyncThunk<boolean, EmployeeBase>(
  'employees/checkExistence',
  async (employee: EmployeeBase, { getState }) => {
    const state = getState() as RootState;
    const exists = state.employees.active.some(
      emp =>
        emp.firstname === employee.firstname &&
        emp.lastname === employee.lastname &&
        emp.dateOfBirth === employee.dateOfBirth,
    );
    return exists;
  },
);

export const { setLoading, addEmployee, updateEmployee, deleteEmployee, archiveEmployee } =
  employeesSlice.actions;
export default employeesSlice;
