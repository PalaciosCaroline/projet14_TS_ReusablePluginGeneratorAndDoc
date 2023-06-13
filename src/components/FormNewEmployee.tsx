import React, { useState, useEffect, FC } from 'react';
import { clearInput, setError } from '../store/employeeFormStateSlice';
import { useDispatch, useSelector } from 'react-redux';
import {checkEmployeeExistence, addEmployee } from '../store/employeesSlice';
import Modal from './Modal';
import { InputField } from './InputField';
import AddressAndDepartmentForm from './AddressAndDepartmentForm';
import { validateNames } from '../utils/controlName';
import { validateDates } from '../utils/controlDate';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { RootState } from '../store/index';
import DatePickerComponent from './DatePickerComponent';
import { Employee } from '../store/employeeFormStateSlice';
import { FaUserCheck } from 'react-icons/fa';
import { EmployeeFormErrors } from '../store/employeeFormStateSlice';
interface Props {
  employeeId?: number;
  employee?: Employee;
}

export const FormNewEmployee: FC<Props> = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employees.active);
  // const selectedEmployee = employees.find((employee: any) => employee.id === employeeId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorEmployeeExist, setErrorEmployeeExist] = useState(null);
  const [employeeName, setEmployeeName] = useState<{
    firstname: string;
    lastname: string;
  }>({
    firstname: '',
    lastname: '',
  });
  const newEmployeeEntree = useSelector(
    (state: RootState) => state.employeeFormState?.formValues,
  );
  const newEmployeeErrors = useSelector(
    (state: RootState) => state.employeeFormState?.formErrors,
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
  } = newEmployeeEntree;

  const {
    errordateOfBirth,
    errorstartDate,
  } = newEmployeeErrors

  useEffect(() => {
    dispatch(clearInput());
  }, []);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const isDateValid = validateDates(dateOfBirth, startDate, setError, dispatch)
    const isNameValid = validateNames(firstname, lastname, setError, dispatch);
    if (!isNameValid || !isDateValid) {
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
      setEmployeeName({ firstname: firstname, lastname: lastname });
      setIsModalOpen(true);
      dispatch(clearInput());
      e.target.reset();
    }
  };

  // const handleFormSubmit =  async (e: any) => {
  //   e.preventDefault();
  //   const isDateValid = validateDates(dateOfBirth, startDate, setError, dispatch)
  //   const isNameValid = validateNames(firstname, lastname, setError, dispatch);
  //   if (!isNameValid || !isDateValid) {
  //     return;
  //   } else if (errordateOfBirth || errorstartDate) {
  //     return;
  //   } else {
  //     const newEmployee = {
  //       firstname,
  //       lastname,
  //       startDate,
  //       department,
  //       dateOfBirth,
  //       street,
  //       city,
  //       state,
  //       zipCode,
  //     };
  //     const exists = await dispatch(checkEmployeeExistence(newEmployee));
  
  //     if (exists) {
  //       // Si l'employé existe déjà, on affiche une erreur
  //       setErrorEmployeeExist(`Employee ${newEmployee.firstname} ${newEmployee.lastname} already exists.`);
  //     } else {
  //       dispatch(addEmployee(newEmployee));
  //       setEmployeeName({ firstname: firstname, lastname: lastname });
  //       setIsModalOpen(true);
  //       dispatch(clearInput());
  //       e.target.reset();
  //     }
  //   }
  // };

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
              key={input.name}
              isWrapped={true}
              name={input.name}
              label={input.label}
              error={newEmployeeErrors[`error${input.name}` as keyof EmployeeFormErrors]?.toString()}
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
        <AddressAndDepartmentForm />
        <button className="btnFormSave" type="submit" data-testid="btn_form">
          Save the new employee
        </button>
      </form>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          className="confirmationModal"
          dataTestId='modalConfirm'
        >
          <div className="box_titleModal">
            <FaUserCheck className="iconCheckedModal" />
            <h2 id="modal-title">Confirmation</h2>
          </div>
          <p tabIndex={0} id="confirmation-text">
            The new employee, {employeeName.firstname} {employeeName.lastname},
            has been registered successfully.
          </p>
        </Modal>
      )}
    </div>
  );
};
