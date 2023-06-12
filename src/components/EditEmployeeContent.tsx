import React, {FC} from "react";
import AddressAndDepartmentForm from "./AddressAndDepartmentForm";
import { EmployeeFormValues } from "../store/employeeFormStateSlice";

interface EditEmployeeContentProps {
    handleChangeSubmit: (employeeId: number) => (e: any) => void;
    selectedEmployeeId: number;
  }
  
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