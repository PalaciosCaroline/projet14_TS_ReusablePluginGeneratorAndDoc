import React, {FC} from "react";
import AddressAndDepartmentForm from "./AddressAndDepartmentForm";
import { EmployeeFormValues } from "../store/employeeFormStateSlice";

interface EditEmployeeContentProps {
    handleChangeSubmit: (employeeId: number) => (e: any) => void;
    selectedEmployeeId: number;
    employeeFormEntree: EmployeeFormValues;
  }
  
  const EditEmployeeContent: FC<EditEmployeeContentProps> = ({ handleChangeSubmit, selectedEmployeeId, employeeFormEntree }) => {
    return (
      <>
        <form
          className="formChangeEmployee"
          action="#"
          id="create-employee"
          onSubmit={handleChangeSubmit(selectedEmployeeId)}
          data-testid="form"
        >
          <AddressAndDepartmentForm />
          <button
            className="btnFormSave"
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