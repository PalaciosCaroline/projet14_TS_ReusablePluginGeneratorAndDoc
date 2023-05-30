import React, { useState, useEffect } from 'react';
import { videInput, setError } from '../store/newEmployeeEntreeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '../store/employeesSlice';
import ConfirmationModal from './ConfirmationModal';
import { InputField } from './InputField';
import FieldsetAddress from './FieldsetAddress';
import Dropdown from './Dropdown';
// import BoxName from './BoxName';
import { validateNames } from '../utils/controlName';
import { departmentOptions } from '../utils/department';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { RootState } from '../store/index';
import DatePickerComponent from './DatePickerComponent';

export default function FormNewEmployee() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [employeeName, setEmployeeName] = useState<{
    firstname: string;
    lastname: string;
  }>({
    firstname: '',
    lastname: '',
  });
  const newEmployeeEntree = useSelector(
    (state: RootState) => state.newEmployeeEntree,
  );
  const {
    firstname,
    lastname,
    startDate,
    department,
    dateOfBirth,
    street,
    city,
    state,
    zipCode,
    errordateOfBirth,
    errorstartDate,
  } = newEmployeeEntree;

  useEffect(() => {
    if (!firstname) {
      dispatch(setError({ name: 'firstname', message: '' }));
    }
    if (!lastname) {
      dispatch(setError({ name: 'lastname', message: '' }));
    }
  }, [dispatch, firstname, lastname]);

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
      setEmployeeName({ firstname, lastname });
      setIsModalOpen(true);
      dispatch(videInput());
      e.target.reset();
    }
  };

  const inputFieldsName = [
    { name: 'firstname', label: 'First Name' },
    { name: 'lastname', label: 'Last Name' },
  ];

  return (
    <div className="box_formEntree">
      <form
        action="#"
        id="create-employee"
        onSubmit={handleFormSubmit}
        data-testid="form"
      >
        <div className="boxName">
          {inputFieldsName.map((input) => (
            <InputField
              isWrapped={true}
              name={input.name}
              label={input.label}
              error={newEmployeeEntree[`error${input.name}`]?.toString()}
            />
          ))}
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="boxDate">
            <DatePickerComponent
              nameDate="dateOfBirth"
              label="Date of Birth"
              minDate={90}
              maxDate={12}
              dateOperation="subtract"
            />
            <DatePickerComponent
              nameDate="startDate"
              label="Start Date"
              minDate={1}
              maxDate={1}
              dateOperation="add"
            />
          </div>
        </LocalizationProvider>
        <FieldsetAddress />
        <Dropdown
          label="Department"
          dropdownLabel="dropdownLabelDepartment"
          placeholder="select a department"
          options={departmentOptions}
          style={{ margin: '8px', width: '100%' }}
        />
        <button className="btnFormSave" type="submit" data-testid="btn_form">
          Save the new employee
        </button>
      </form>
      {isModalOpen && (
        <ConfirmationModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          firstname={employeeName.firstname}
          lastname={employeeName.lastname}
        />
      )}
    </div>
  );
}
