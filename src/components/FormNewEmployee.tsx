import React, { useState, useEffect } from 'react';
import ConfirmationModal from './ConfirmationModal';
import FieldsetAddress from './FieldsetAddress';
import DropdownDepartment from './DropdownDepartment';
import { videInput, setError } from '../store/newEmployeeEntreeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Employee, addEmployee } from '../store/employeesSlice';
import BoxName from './BoxName';
import { validateNames } from '../utils/controlName';
import StartDate from './StartDate';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DateOfBirth from './DateOfBirth';
import { RootState } from '../store/index';
// import { Employee } from '../mocks/data';
import dayjs from 'dayjs';

export default function FormNewEmployee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const firstname = useSelector(
    (state: RootState) => state.newEmployeeEntree.firstname,
  );
  const lastname = useSelector(
    (state: RootState) => state.newEmployeeEntree.lastname,
  );
  const startDate = useSelector(
    (state: RootState) => state.newEmployeeEntree.startDate,
  );
  const department = useSelector(
    (state: RootState) => state.newEmployeeEntree.department,
  );
  const dateOfBirth = useSelector(
    (state: RootState) => state.newEmployeeEntree.dateOfBirth,
  );
  const errordateOfBirth = useSelector(
    (state: RootState) => state.newEmployeeEntree.errordateOfBirth,
  );
  const errorstartDate = useSelector(
    (state: RootState) => state.newEmployeeEntree.errorstartDate,
  );
  const street = useSelector(
    (state: RootState) => state.newEmployeeEntree.street,
  );
  const city = useSelector((state: RootState) => state.newEmployeeEntree.city);
  const state = useSelector(
    (state: RootState) => state.newEmployeeEntree.state,
  );
  const zipCode = useSelector(
    (state: RootState) => state.newEmployeeEntree.zipCode,
  );
  const [initialValues, setInitialValues] = useState<{
    startDateInput: dayjs.Dayjs | null;
    dateOfBirthInput: dayjs.Dayjs | null;
  }>({
    startDateInput: null,
    dateOfBirthInput: null,
  });

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const isNameValid = validateNames(firstname, lastname, setError, dispatch);
    if (!isNameValid) {
      return;
    } else if (errordateOfBirth || errorstartDate) {
      return;
    } else {
      const newEmployee = {
        firstname,
        lastname,
        startDate,
        department,
        dateOfBirth,
        street,
        city,
        state,
        zipCode,
      };
      dispatch(addEmployee(newEmployee));
      setInitialValues({ startDateInput: null, dateOfBirthInput: null });
      setIsModalOpen(true);
      dispatch(videInput());
      e.target.reset();
    }
  };

  return (
    <div className="box_formEntree">
      <form
        action="#"
        id="create-employee"
        onSubmit={handleFormSubmit}
        data-testid="form"
      >
        <BoxName />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="boxDate">
            <DateOfBirth
              className="form-group box-input"
              errordateOfBirth={errordateOfBirth}
              setInitialValues={setInitialValues}
              initialValues={initialValues}
            />
            <StartDate
              className="box-input"
              errorstartDate={errorstartDate}
              setInitialValues={setInitialValues}
              initialValues={initialValues}
            />
          </div>
        </LocalizationProvider>
        <FieldsetAddress />
        <DropdownDepartment />
        <button className="btnFormSave" type="submit" data-testid="btn_form">
          Save the new employee
        </button>
      </form>
      {isModalOpen && (
        <ConfirmationModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
    </div>
  );
}
