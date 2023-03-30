import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dataEmployeesMock } from '../mocks/data';

interface Employee {
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  startDate: string;
  department: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

const employeesSlice = createSlice({
  name: 'employees',
  initialState: dataEmployeesMock as Employee[],
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.push(action.payload);
    }
  }
});

export const addEmployee = createAction<Employee>('employees/addEmployee');
export default employeesSlice;