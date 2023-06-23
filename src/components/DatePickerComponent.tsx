import React, {useEffect } from 'react';
import { RootState } from './../store/index';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { setField, setError } from '../store/employeeFormStateSlice';

/**
 * Defines the properties of the DatePickerComponent.
 * 
 * @interface
 * 
 * @property {string} nameDate - The name of the date field.
 * @property {string} label - The label to be displayed above the DatePicker input.
 * @property {number} minDate - The minimum selectable date, calculated as the current date subtracted by this value (in years).
 * @property {number} maxDate - The maximum selectable date, calculated as the current date added or subtracted by this value (in years), based on the dateOperation prop.
 * @property {'add' | 'subtract'} dateOperation - A string that defines whether the maxDate should be calculated by adding or subtracting years to/from the current date.
 */
interface DatePickerProps {
  nameDate: string;
  label: string;
  minDate: number;
  maxDate: number;
  dateOperation: 'add' | 'subtract';
}

/**
 * This is a functional component that renders a DatePicker input.
 * The user can select a date within a specified range, defined by the minDate and maxDate props.
 * The selected date is validated and dispatched to the redux store.
 * 
 * @component
 * 
 * @param {DatePickerProps} props - The props that are passed to this component
 * @returns {JSX.Element}
 */
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
    <div className={`form-group box_${nameDate} ${errorDate ? 'errorBorder' : ''}`}>
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
              width: '180px',
              margin: '8px',
              padding:'8px 10px'
            },
          }}
        />
        {errorDate ? <p className="errorMessage">{errorDate}</p> : ''}
      </div>
    </div>
  );
}
