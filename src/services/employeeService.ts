import { Dispatch } from 'redux';
import {
  updateEmployee,
  deleteEmployee,
  archiveEmployee,
  setLoading
} from '../store/employeesSlice';

import { setError } from '../store/employeeFormStateSlice';
import isDate from '../utils/controlDate';
import { EmployeeBase } from '../mocks/data';

export const handleChangeEmployee = (dispatch: Dispatch, employeeFormEntree: any, closeModal: () => void, employeeId: number) => {
  dispatch(setLoading(true));
  dispatch(
    updateEmployee({
      id: employeeId,
      ...employeeFormEntree,
    }),
  );
  closeModal();
  dispatch(setLoading(false));
};

export const handleArchiveEmployee = (dispatch: Dispatch, employeeFormEntree: any, closeModal: () => void, employeeEntreeErrors: any, employeeId: number) => {
  dispatch(setLoading(true));
  const endDate = employeeFormEntree.endDate;
  if (employeeEntreeErrors.errorendDate) {
    dispatch(setLoading(false));
    return;
  }
  if (!isDate(endDate, setError, 'endDate', dispatch)) {
    dispatch(setLoading(false));
    return;
  } else {
    dispatch(archiveEmployee({ id: employeeId, endDate }));
    closeModal();
    dispatch(setLoading(false));
  }
};

export const handleDeleteEmployee = (dispatch: Dispatch, closeModal: () => void, employeeId: number) => {
  dispatch(setLoading(true));
  dispatch(deleteEmployee(employeeId));
  closeModal();
  dispatch(setLoading(false));
};
