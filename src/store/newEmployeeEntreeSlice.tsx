// import { createSlice } from '@reduxjs/toolkit';

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

interface NewEmployeeEntryState {
  firstname: string;
  lastname: string;
  startDate: string;
  department: string;
  dateOfBirth: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isLoadingNewEntree: boolean;
  [key: string]: string | boolean | undefined;
}

const initialState: NewEmployeeEntryState = {
  firstname: '',
  lastname: '',
  startDate: '',
  department: '',
  dateOfBirth: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  isLoadingNewEntree: false,
};

interface SetFieldPayload {
  name: keyof NewEmployeeEntryState;
  value: string;
}

interface SetErrorPayload {
  name: string;
  message: string;
}

const newEmployeeEntreeSlice = createSlice({
  name: 'newEmployeeEntree',
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<SetFieldPayload>) => {
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    },
    videInput: (state) => {
      Object.keys(initialState).forEach((key) => {
        state[key as keyof NewEmployeeEntryState] = '';
      });
    },
    setError: (state, action: PayloadAction<SetErrorPayload>) => {
      const { name, message } = action.payload;
      state[name] = message;
    },
    setIsLoadingNewEntree: (state, action: PayloadAction<boolean>) => {
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