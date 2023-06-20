import React, { FC } from 'react';
import DatePickerComponent from './DatePickerComponent';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';

/**
 * Defines the properties of the component.
 *
 * @interface
 *
 * @property {function} handleArchiveSubmit - The function that is called when the form is submitted.
 * This function takes the id of the selected employee as a parameter and returns a function
 * that takes the form submission event as a parameter.
 *
 * @property {number} selectedEmployeeId - The id of the selected employee.
 * @property {boolean} isLoading - A boolean flag indicating whether data is currently being loaded. If true, the save changes button will be disabled.
 */
interface ArchiveEmployeeContentProps {
  handleArchiveSubmit: (employeeId: number) => (e: any) => void;
  selectedEmployeeId: number;
  isLoading: boolean;
}

/**
 * This is a Functional Component that renders the content for archiving an employee.
 * It includes a form with a DatePickerComponent for selecting an end date for the employee.
 *
 * @component
 *
 * @param {ArchiveEmployeeContentProps} props - The props that are passed to this component
 * @returns {JSX.Element}
 */
const ArchiveEmployeeContent: FC<ArchiveEmployeeContentProps> = ({
  handleArchiveSubmit,
  selectedEmployeeId,
  isLoading,
}) => {
  return (
    <>
      <form
        className="formChangeEmployee"
        action="#"
        id="archive-employee"
        onSubmit={handleArchiveSubmit(selectedEmployeeId)}
        data-testid="form"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <div className="boxDate">
            <DatePickerComponent
              nameDate="endDate"
              label="End date"
              minDate={1}
              maxDate={1}
              dateOperation="add"
            />
          </div>
        </LocalizationProvider>
        <button
          className="btnFormArchive"
          type="submit"
          data-testid="btn_form"
          disabled={isLoading}
        >
          Archive Employee
        </button>
      </form>
    </>
  );
};

export default ArchiveEmployeeContent;
