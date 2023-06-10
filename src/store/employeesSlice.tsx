import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dataEmployeesMock } from '../mocks/data';
import { EmployeeBase } from './../employeeTypes'

export interface Employee extends EmployeeBase {
  id: number;
  endDate?: string; 
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
    // enregistrement de l'idUser à faire et Date d'enregistrement
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
    // enregistrement de l'idUser à faire et Date d'archivage
    // archiveEmployee: (state, action: PayloadAction<number>) => {
    //   const index = state.active.findIndex(
    //     (employee) => employee.id === action.payload,
    //   );
    //   if (index !== -1) {
    //     const [employee] = state.active.splice(index, 1);
    //     state.archived.push(employee);
    //   }
    // },
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
    // enregistrement de l'idUser à faire et Date d'effacement
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.active = state.active.filter(
        (employee) => employee.id !== action.payload,
      );
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee, archiveEmployee } =
  employeesSlice.actions;
export default employeesSlice;
