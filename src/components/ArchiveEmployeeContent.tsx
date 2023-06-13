import React, { FC } from 'react';
import DatePickerComponent from './DatePickerComponent';
import { EmployeeFormValues } from '../store/employeeFormStateSlice';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface ArchiveEmployeeContentProps {
  handleArchiveSubmit: (employeeId: number) => (e: any) => void;
  selectedEmployeeId: number;
}

const ArchiveEmployeeContent: FC<ArchiveEmployeeContentProps> = ({
  handleArchiveSubmit,
  selectedEmployeeId,
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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

        <button className="btnFormArchive" type="submit" data-testid="btn_form">
          Archive Employee
        </button>
      </form>
    </>
  );
};

export default ArchiveEmployeeContent;
