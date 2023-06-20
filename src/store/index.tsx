import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import employeeFormStateSlice from './employeeFormStateSlice';
import employeesSlice from './employeesSlice';

const rootReducer = combineReducers({
  employees: employeesSlice.reducer,
  employeeFormState: employeeFormStateSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

const getEmployeesLoadingState = (state: RootState) => state.employees.isLoading;
const getEmployeeFormState = (state: RootState) => state.employeeFormState;
const getEmployeesErrorState = (state: RootState) => state.employees.errorEmployeeExist;

export const employeeStateSelector = createSelector(
  getEmployeesLoadingState,
  getEmployeeFormState,
  getEmployeesErrorState,
  (isLoading, employeeFormState, errorEmployeeExist) => ({ isLoading, employeeFormState,errorEmployeeExist })
);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
