import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { RootState } from './../store/index';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { setField, setError } from './../store/newEmployeeEntreeSlice';

interface DatePickerProps {
  nameDate: string;
  label: string;
  minDate: number;
  maxDate: number;
  dateOperation: "add" | "subtract";
}

export default function DatePickerComponent({
  nameDate,
  label,
  minDate,
  maxDate,
  dateOperation,
}: DatePickerProps): JSX.Element {
  const dateInput = useSelector(
    (state: RootState) => state.newEmployeeEntree[nameDate],
  );
  const errorDate = useSelector(
    (state: RootState) => state.newEmployeeEntree[`error${nameDate}`],
  );
  const dispatch = useDispatch();
  const noBeforeDay = dayjs().subtract(minDate, 'year');
  const noAfterDay = dateOperation === 'add' ? dayjs().add(maxDate, 'year') : dayjs().subtract(maxDate, 'year');

  useEffect(() => {
    if (!dateInput) {
      dispatch(setError({ name: nameDate, message: '' }));
    }
  }, []);

  const handleDateChange = (date: any): void => {
    // Convert the date to Dayjs
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
          minDate={noBeforeDay.format('DD/MM/YYYY')}
          maxDate={noAfterDay.format('DD/MM/YYYY')}
          value={typeof dateInput === 'string' && dateInput ? dayjs(dateInput).format('DD/MM/YYYY') : null}
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
        {errorDate ? (
          <p className="errorMessage">{errorDate}</p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
