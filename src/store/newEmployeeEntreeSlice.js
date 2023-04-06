import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstname: '',
  lastname: '',
  startDate: '',
  department: '',
  dateOfBirth: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
};

const newEmployeeEntreeSlice = createSlice({
  name: 'newEmployeeEntree',
  initialState,
  reducers: {
    setField: (state, action) => {
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    },
    videInput: (state) => {
      Object.keys(initialState).forEach((key) => {
        state[key] = '';
      });
    },
    setError: (state, action) => {
      const { name, message } = action.payload;
      state[`error${name}`] = message;
    },
    setIsLoadingNewEntree: (state, action) => {
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

