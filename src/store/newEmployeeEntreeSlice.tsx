// import { createSlice } from '@reduxjs/toolkit';

// interface WritableDraft<T> {
//   [key: string]: T[keyof T];
// }

// const initialState = {
//   firstname: '',
//   lastname: '',
//   startDate: '',
//   department: '',
//   dateOfBirth: '',
//   street: '',
//   city: '',
//   state: '',
//   zipCode: '',
// };

// const newEmployeeEntreeSlice = createSlice({
//   name: 'newEmployeeEntree',
//   initialState,
//   reducers: {
//     setField: (state, action) => {
//       return {
//         ...state,
//         [action.payload.name]: action.payload.value
//       };
//     },
//     videInput: (state) => {
//       Object.keys(initialState).forEach((key) => {
//         state[key] = '';
//       });
//     },
//     setError: (state, action) => {
//       const { name, message } = action.payload;
//       state[`error${name}`] = message;
//     },
//     setIsLoadingNewEntree: (state, action) => {
//       state.isLoadingNewEntree = action.payload;
//     },
//   },
// });

// export const {
//   setField,
//   videInput,
//   setError,
//   setIsLoadingNewEntree,
// } = newEmployeeEntreeSlice.actions;

// export default newEmployeeEntreeSlice;



import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Employee {
  firstname: string;
  lastname: string;
  startDate: string;
  department: string;
  dateOfBirth: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  errorfirstname:string;
  errorlastname:string;
  errordateOfBirth:string;
  errorstartDate:string;
  isLoadingNewEntree: boolean;
}

interface WritableDraft<T> {
  [key: string]: T[keyof T];
}

const initialState: Employee = {
  firstname: '',
  lastname: '',
  startDate: '',
  department: '',
  dateOfBirth: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  errorfirstname:'',
  errorlastname:'',
  errordateOfBirth:'',
  errorstartDate:'',
  isLoadingNewEntree: false,
};

const newEmployeeEntreeSlice = createSlice({
  name: 'newEmployeeEntree',
  initialState,
  reducers: {
    setField: (state: Employee, action: PayloadAction<{ name: string; value: string }>) => {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    },
    videInput: (state: WritableDraft<Employee>) => {
      Object.keys(initialState).forEach((key) => {
        state[key] = '';
      });
    },
    setError: (state: WritableDraft<Employee>, action: PayloadAction<{ name: string; message: string }>) => {
      const { name, message } = action.payload;
      state[`error${name}`] = message;
    },
    setIsLoadingNewEntree: (state: Employee, action: PayloadAction<boolean>) => {
      state.isLoadingNewEntree = action.payload;
    },
  },
});

export const {
  setField,
  videInput,
  setError,
  setIsLoadingNewEntree,
} = newEmployeeEntreeSlice.actions;

export default newEmployeeEntreeSlice;