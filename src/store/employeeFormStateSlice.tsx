import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmployeeBase } from '../employeeTypes';
// import { Employee } from './employeesSlice';

export interface Employee extends EmployeeBase {
  id: number | null;
  [key: string]: string | boolean | null | number;
}

interface Error {
  name: string;
  message: string;
}

// interface WritableDraft<T> {
//   [key: string]: T[keyof T];
// }

export interface EmployeeFormValues extends EmployeeBase {
  id: number | null;
  endDate: string;
  [key: string]: string | number | null;
}

// This type represents the structure of your form errors
export interface EmployeeFormErrors {
  errorfirstname: string;
  errorlastname: string;
  errordateOfBirth: string;
  errorstartDate: string;
  errorendDate: string;
  [key: string]: string | null;
}

interface EmployeeFormState {
  formValues: EmployeeFormValues;
  formErrors: EmployeeFormErrors;
  isLoadingNewEntree: boolean;
}

const initialState: EmployeeFormState = {
  formValues: {
    id: null,
    firstname: '',
    lastname: '',
    startDate: '',
    department: '',
    dateOfBirth: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    endDate: '',
  },
  formErrors: {
    errorfirstname: '',
    errorlastname: '',
    errordateOfBirth: '',
    errorstartDate: '',
    errorendDate: '',
  },
  isLoadingNewEntree: false,
};

const employeeFormStateSlice = createSlice({
  name: 'employeeFormState',
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<{ name: keyof EmployeeFormValues; value: string }>) => {
      state.formValues[action.payload.name] = action.payload.value;
    },
    clearInput: (state) => {
      state.formValues = initialState.formValues;
      state.formErrors = initialState.formErrors;
    },
    // setError: (state, action: PayloadAction<Error>) => {
    //   state.formErrors[`error${action.payload.name}`] = action.payload.message;
    // },
    setError: (state, action: PayloadAction<{ name: string; message: string }>) => {
      state.formErrors[`error${action.payload.name}`] = action.payload.message;
    },
    setEmployeeData: (state, action: PayloadAction<EmployeeFormValues>) => {
      state.formValues = action.payload;
    },
  },
});

export const { setField, clearInput, setError, setEmployeeData } = employeeFormStateSlice.actions;

export default employeeFormStateSlice;
