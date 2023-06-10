import { configureStore, combineReducers } from '@reduxjs/toolkit';
import employeeFormStateSlice from './employeeFormStateSlice';
import employeesSlice from './employeesSlice';

const rootReducer = combineReducers({
  employees: employeesSlice.reducer,
  employeeFormState: employeeFormStateSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
