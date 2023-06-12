import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { RootState } from './../store/index';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { setField, setError } from '../store/employeeFormStateSlice';
import { EmployeeFormErrors, EmployeeFormValues } from '../store/employeeFormStateSlice';

interface DatePickerProps {
  nameDate: string;
  label: string;
  minDate: number;
  maxDate: number;
  dateOperation: 'add' | 'subtract';
}

export default function DatePickerComponent({
  nameDate,
  label,
  minDate,
  maxDate,
  dateOperation,
}: DatePickerProps): JSX.Element {
 
  const dateInput = useSelector(
    (state: RootState) =>
      state.employeeFormState.formValues[nameDate],
  );
      const errorKey = `error${nameDate}`;
const errorDate = useSelector(
  (state: RootState) => state.employeeFormState.formErrors[errorKey],
);
  const dispatch = useDispatch();
  const noBeforeDay = dayjs().subtract(minDate, 'year');
  const noAfterDay =
    dateOperation === 'add'
      ? dayjs().add(maxDate, 'year')
      : dayjs().subtract(maxDate, 'year');

  useEffect(() => {
    if (!dateInput) {
      dispatch(setError({ name: nameDate, message: '' }));
    }
  }, []);

  const handleDateChange = (date: any): void => {
    const selectedDate = dayjs(date);
    const isValidDate =
      selectedDate.isValid() &&
      !(noBeforeDay > selectedDate || selectedDate > noAfterDay);
    dispatch(
      setError({
        name: nameDate,
        message: isValidDate ? '' : 'Please select a valid date',
      }),
    );
    if (isValidDate) {
      dispatch(
        setField({
          name: nameDate,
          value: selectedDate.format('DD/MM/YYYY'),
        }),
      );
    }
  };

  return (
    <div className={`form-group box_${nameDate}`}>
      <p className={`text_${nameDate}`}>{label}</p>
      <div
        className="box_Input "
        style={{ display: 'flex', position: 'relative' }}
      >
        <DatePicker
          label={`${label} Select`}
          minDate={noBeforeDay}
          maxDate={noAfterDay}
          value={
            dateInput
              ? typeof dateInput === 'string'
                ? dayjs(dateInput, 'DD/MM/YYYY')
                : dateInput
              : null
          }
          views={['year', 'month', 'day']}
          onChange={handleDateChange}
          sx={{
            '& .MuiInputBase-input': {
              height: '20px',
              width: '160px',
              margin: '10px',
            },
          }}
        />
        {errorDate ? <p className="errorMessage">{errorDate}</p> : ''}
      </div>
    </div>
  );
}
