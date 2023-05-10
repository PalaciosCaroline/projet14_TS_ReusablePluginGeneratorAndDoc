import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dataEmployeesMock } from '../mocks/data';

export interface Employee {
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

const employeesSlice = createSlice({
  name: 'employees',
  initialState: dataEmployeesMock as Array<Employee>,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.push(action.payload);
    },
  },
});

export const addEmployee = createAction<Employee>('employees/addEmployee');
export default employeesSlice;
