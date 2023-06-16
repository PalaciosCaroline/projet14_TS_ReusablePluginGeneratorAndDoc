import React, { FC } from 'react';
import DatePickerComponent from './DatePickerComponent';
import { EmployeeFormValues } from '../store/employeeFormStateSlice';

/**
 * Defines the properties of the DeleteEmployeeContent component.
 * 
 * @interface
 * 
 * @property {Function} handleDeleteSubmit - The function to call when the "Confirm Delete" button is clicked. It takes the selected employee's ID as a parameter.
 * @property {number} selectedEmployeeId - The ID of the employee to delete.
 * @property {Function} handleCancel - The function to call when the "Cancel" button is clicked.
 */
interface DeleteEmployeeContentProps {
  handleDeleteSubmit: (employeeId: number) => void;
  selectedEmployeeId: number;
  handleCancel: () => void;
  // employeeFormEntree: EmployeeFormValues;
}

/**
 * This is a functional component that renders a delete confirmation box with two buttons: 
 * one to confirm the deletion, and another to cancel the operation.
 * 
 * @component
 * 
 * @param {DeleteEmployeeContentProps} props - The props that are passed to this component
 * @returns {React.FC}
 * /**
   * Renders a div with two buttons.
   * 
   * The "Confirm Delete" button calls the handleDeleteSubmit function when clicked, passing in the selected employee's ID.
   * 
   * The "Cancel" button calls the handleCancel function when clicked.
 */
const DeleteEmployeeContent: FC<DeleteEmployeeContentProps> = ({
  handleDeleteSubmit,
  selectedEmployeeId,
  handleCancel,
}) => {
   
  return (
    <div className="box_btnsDelete">
      <button
        className="btnFormDelete"
        data-testid="btn_DeleteConfirm"
        onClick={() => handleDeleteSubmit(selectedEmployeeId)}
      >
        Confirm Delete
      </button>
      <button
        className="btnFormCancel"
        data-testid="btn_form"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default DeleteEmployeeContent;
