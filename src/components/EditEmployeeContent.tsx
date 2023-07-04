import React, { FC } from 'react';
import AddressAndDepartmentForm from './AddressAndDepartmentForm';

/**
 * Defines the properties of the EditEmployeeContent component.
 *
 * @interface
 *
 * @property {Function} handleChangeSubmit - The handler function that is invoked when the form is submitted. It should return a function that takes the event object and handles it.
 * @property {number} selectedEmployeeId - The ID of the employee being edited.
 * @property {boolean} isLoading - A boolean flag indicating whether data is currently being loaded. If true, the save changes button will be disabled.
 */
interface EditEmployeeContentProps {
  handleChangeSubmit: (employeeId: number) => (e: any) => void;
  selectedEmployeeId: number;
  isLoading: boolean;
}

/**
 * EditEmployeeContent is a functional component that renders a form for editing an employee's information.
 * @component
 *
 * @param {EditEmployeeContentProps} props - The props that are passed to this component
 *
 * @returns {React.FC}
 */
const EditEmployeeContent: FC<EditEmployeeContentProps> = ({
  handleChangeSubmit,
  selectedEmployeeId,
  isLoading,
}) => {
  return (
    <>
      <form
        className="formChangeEmployee formApp"
        action="#"
        id="edit-employee"
        onSubmit={handleChangeSubmit(selectedEmployeeId)}
        data-testid="form"
      >
        <AddressAndDepartmentForm />
        <button
          className="btnApp btnFormEdit"
          type="submit"
          data-testid="btn_formUpdate"
          disabled={isLoading}
        >
          Save Changes
        </button>
      </form>
    </>
  );
};

export default EditEmployeeContent;
