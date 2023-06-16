import React, {FC} from "react";
import AddressAndDepartmentForm from "./AddressAndDepartmentForm";
import { EmployeeFormValues } from "../store/employeeFormStateSlice";

/**
 * Defines the properties of the EditEmployeeContent component.
 *
 * @interface
 *
 * @property {Function} handleChangeSubmit - The handler function that is invoked when the form is submitted. It should return a function that takes the event object and handles it.
 * @property {number} selectedEmployeeId - The ID of the employee being edited.
 */
interface EditEmployeeContentProps {
    handleChangeSubmit: (employeeId: number) => (e: any) => void;
    selectedEmployeeId: number;
  }
  
  /**
 * EditEmployeeContent is a functional component that renders a form for editing an employee's information.
 * @component
 *
 * @param {EditEmployeeContentProps} props - The props that are passed to this component
 *
 * @returns {React.FC}
 */
const EditEmployeeContent: FC<EditEmployeeContentProps> = ({ handleChangeSubmit, selectedEmployeeId }) => {
    return (
      <>
        <form
          className="formChangeEmployee"
          action="#"
          id="edit-employee"
          onSubmit={handleChangeSubmit(selectedEmployeeId)}
          data-testid="form"
        >
          <AddressAndDepartmentForm />
          <button
            className="btnFormEdit"
            type="submit"
            data-testid="btn_form"
          >
            Save Changes
          </button>
        </form>
      </>
    );
  };

  export default EditEmployeeContent;