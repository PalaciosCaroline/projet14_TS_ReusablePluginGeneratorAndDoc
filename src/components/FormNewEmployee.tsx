import React, { useState, useEffect, FC, useRef, useMemo } from 'react';
import { createSelector } from 'reselect';
import { clearInput, setError } from '../store/employeeFormStateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, setLoading } from '../store/employeesSlice';
import { employeeStateSelector } from '../store/index';
// import Modal from './Modal';
const Modal = React.lazy(() => import('./Modal'));
import { InputField } from './InputField';
import AddressAndDepartmentForm from './AddressAndDepartmentForm';
import { validateNames } from '../utils/controlName';
import { validateDates } from '../utils/controlDate';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import { RootState } from '../store/index';
import DatePickerComponent from './DatePickerComponent';
import { Employee } from '../store/employeeFormStateSlice';
import { FaUserCheck } from 'react-icons/fa';
import { BiErrorAlt } from 'react-icons/bi';
import { EmployeeFormErrors } from '../store/employeeFormStateSlice';

/**
 * Defines the properties of the FormNewEmployee component.
 *
 * @interface
 *
 * @property {number} [employeeId] - The ID of the employee being edited, if applicable.
 * @property {Employee} [employee] - The employee object, if applicable.
 */
interface Props {
  employeeId?: number;
  employee?: Employee;
}

export type ModalType = 'confirmationModal' | 'errorConfirmationModal' | 'none';

/**
 * FormNewEmployee is a functional component that renders a form for creating a new employee.
 * It provides fields for an employee's name, date of birth, start date, and address information.
 * On form submission, it validates the provided data, and if valid, adds a new employee to the store.
 * If the operation is successful, it opens a modal with a success message.
 * @component
 *
 * @returns {React.FC}
 */
export const FormNewEmployee: FC<Props> = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('none');
  const [employeeName, setEmployeeName] = useState<{
    firstname: string;
    lastname: string;
    dateOfBirth: string;
  }>({
    firstname: '',
    lastname: '',
    dateOfBirth: '',
  });

  const { isLoading, employeeFormState, errorEmployeeExist } = useSelector(
    employeeStateSelector,
  );
  const newEmployeeErrors = employeeFormState?.formErrors;
  const newEmployeeEntree = employeeFormState?.formValues;

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
  const lastFocusedElementRef = useRef<Element | null>(null);

  const { errordateOfBirth, errorstartDate } = newEmployeeErrors;

  useEffect(() => {
    dispatch(clearInput());
  }, []);

  useEffect(() => {
    if (errorEmployeeExist) {
      setModalType('errorConfirmationModal');
    } else {
      setModalType('confirmationModal');
    }
  }, [errorEmployeeExist]);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const isDateValid = validateDates(
      dateOfBirth,
      startDate,
      setError,
      dispatch,
    );
    const isNameValid = validateNames(firstname, lastname, setError, dispatch);
    if (!isNameValid || !isDateValid) {
      dispatch(setLoading(false));
      return;
    } else if (errordateOfBirth || errorstartDate) {
      dispatch(setLoading(false));
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
      setEmployeeName({
        firstname: firstname,
        lastname: lastname,
        dateOfBirth: dateOfBirth,
      });
      lastFocusedElementRef.current = document.activeElement;
      setIsModalOpen(true);
      dispatch(clearInput());
      e.target.reset();
      dispatch(setLoading(false));
    }
  };

  const inputFieldsName = useMemo(
    () => [
      { name: 'firstname', label: 'First Name' },
      { name: 'lastname', label: 'Last Name' },
    ],
    [],
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType('none');
    if (
      lastFocusedElementRef.current &&
      lastFocusedElementRef.current instanceof HTMLElement
    ) {
      lastFocusedElementRef.current.focus();
    }
  };

  const modalProperties = {
    confirmationModal: {
      icon: <FaUserCheck className="iconCheckedModal" />,
      title: 'Confirmation',
      modalFormAddContent: (
        <p tabIndex={0} id="confirmation-text">
          The new employee, {employeeName.firstname} {employeeName.lastname},
          has been registered successfully.
        </p>
      ),
    },
    errorConfirmationModal: {
      icon: <BiErrorAlt className="iconCheckedModal" />,
      title: 'Error',
      modalFormAddContent: (
        <p tabIndex={0} id="error-text">
          The employee {employeeName.firstname} {employeeName.lastname}, born on{' '}
          {employeeName.dateOfBirth}, already exist.
        </p>
      ),
    },
    none: {
      icon: null,
      title: '',
      modalFormAddContent: null
    },
  };

  const { icon, title, modalFormAddContent } = modalProperties[modalType];

  return (
    <div className="box_formEntree">
      <form
        action="#"
        id="create-employee"
        onSubmit={handleFormSubmit}
        data-testid="form"
        className='formApp'
      >
        <div className="boxName">
          {inputFieldsName.map((input) => (
            <InputField
              key={input.name}
              isWrapped={true}
              name={input.name}
              label={input.label}
              error={newEmployeeErrors[
                `error${input.name}` as keyof EmployeeFormErrors
              ]?.toString()}
            />
          ))}
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
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
        <button
          className="btnApp btnFormSave"
          type="submit"
          data-testid="btn_form"
          disabled={isLoading}
        >
          Save the new employee
        </button>
      </form>
      <React.Suspense fallback={<></>}>
      {isModalOpen && modalType != 'none' && (
        <Modal
          isModalOpen={isModalOpen}
          closeModal={handleCloseModal}
          className={`formAddModal formAppModal ${
            errorEmployeeExist ? 'errorConfirmationModal' : 'confirmationModal'
          }`}
          dataTestId="modalConfirm"
          icon={icon}
          title={title}
        >
          {modalFormAddContent}
        </Modal>
      )}
       </React.Suspense>
    </div>
  );
};
