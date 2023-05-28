import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { RootState } from './../store/index';
import dayjs from 'dayjs';
import { setField, setError } from '../store/newEmployeeEntreeSlice';

interface StartDateProps {
  className: string;
  errorstartDate: string | null;
  setInitialValues: React.Dispatch<
    React.SetStateAction<{
      startDateInput:dayjs.Dayjs | null;
      dateOfBirthInput: dayjs.Dayjs | null;
    }>
  >;
  initialValues: {
    startDateInput: dayjs.Dayjs | null;
    dateOfBirthInput: dayjs.Dayjs | null;
  };
}

export default function StartDate({
  errorstartDate,
  initialValues,
  setInitialValues,
}: StartDateProps): JSX.Element {
  const dispatch = useDispatch();
  const startDate = useSelector(
    (state: RootState) => state.newEmployeeEntree.startDate,
  );
  const noBeforeDay = dayjs().subtract(1, 'year');
  const noAfterDay = dayjs().add(1, 'year');

  useEffect(() => {
    if (!startDate || !initialValues.startDateInput) {
      dispatch(setError({ name: 'startDate', message: '' }));
    }
  }, []);

  const handleDateChange = (date: any): void => {
    setInitialValues({ ...initialValues, startDateInput: date });
    dispatch(setError({ name: 'startDate', message: '' }));
    const isInvalid = noBeforeDay > date || date > noAfterDay;
    if (isInvalid) {
      dispatch(
        setError({ name: 'startDate', message: 'Please select a valid date ' }),
      );
      return;
    } else {
      dispatch(setError({ name: 'startDate', message: '' }));
      dispatch(
        setField({
          name: 'startDate',
          value: dayjs(date).format('DD/MM/YYYY'),
        }),
      );
    }
  };

  return (
    <>
      <div className="form-group box_startDate">
        <p className='text_startDate'>Start Date</p>
        <div
          className="box_Input"
          style={{ display: 'flex', position: 'relative' }}
        >
          <DatePicker
            label="Start Date Select"
            minDate={noBeforeDay}
            maxDate={noAfterDay}
            views={['year', 'month', 'day']}
            value={initialValues.startDateInput}
            onChange={handleDateChange}
            sx={{
              '& .MuiInputBase-input': {
                height: '20px',
                width: '160px',
                margin: '10px',
              },
            }}
          />
          {errorstartDate ? (
            <p className="errorMessage">{errorstartDate}</p>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}
