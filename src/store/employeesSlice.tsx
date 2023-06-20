import { createAction, createSlice, PayloadAction,  createAsyncThunk } from '@reduxjs/toolkit';
import { dataEmployeesMock } from '../mocks/data';
import { EmployeeBase } from './../employeeTypes'
import { RootState } from './index';
import dayjs from 'dayjs';

export interface Employee extends EmployeeBase {
  id: number;
  endDate?: string; 
}

let nextId = 22;

interface EmployeesState {
  active: Employee[];
  archived: Employee[];
  isLoading: boolean;
  errorEmployeeExist: string | null;
}

export const initialState: EmployeesState = {
  active: dataEmployeesMock,
  archived: [],
  isLoading: false,
  errorEmployeeExist: null, 
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
      state.isLoading = action.payload;
    },
    // sécurité: enregistrement de l'idUser à faire et Date d'enregistrement
    addEmployee: {
      reducer: (state, action: PayloadAction<Employee>) => {
        const existingEmployee = state.active.find(
          (employee) => 
            employee.firstname === action.payload.firstname &&
            employee.lastname === action.payload.lastname &&
            employee.dateOfBirth === action.payload.dateOfBirth
        );
        if (existingEmployee) {
          state.errorEmployeeExist = "Employee already exists";
        } else {
          state.active.push(action.payload);
          state.errorEmployeeExist = null; // réinitialiser l'erreur si l'ajout est réussi
        }
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

export const { setLoading, addEmployee, updateEmployee, deleteEmployee, archiveEmployee } =
  employeesSlice.actions;
export default employeesSlice;
