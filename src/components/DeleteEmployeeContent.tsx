import React, { FC } from 'react';
import DatePickerComponent from './DatePickerComponent';
import { EmployeeFormValues } from '../store/employeeFormStateSlice';

interface DeleteEmployeeContentProps {
  handleDeleteSubmit: (employeeId: number) => void;
  selectedEmployeeId: number;
  handleCancel: () => void;
  // employeeFormEntree: EmployeeFormValues;
}

const DeleteEmployeeContent: FC<DeleteEmployeeContentProps> = ({
  handleDeleteSubmit,
  selectedEmployeeId,
  handleCancel
}) => {
  return (
    <>
       <button className="btnFormDelete" data-testid="btn_DeleteConfirm" onClick={() => handleDeleteSubmit(selectedEmployeeId)}>
          Confirm Delete this Employee
        </button>
        <button className="btnFormCancel" data-testid="btn_form" onClick={handleCancel}>
          Cancel
        </button>
    </>
  );
};

export default DeleteEmployeeContent;
