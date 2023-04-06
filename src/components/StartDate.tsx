import React from 'react';
import { useDispatch } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {
  setField,
  setError,
} from '../store/newEmployeeEntreeSlice';

interface StartDateProps {
  errorstartDate: string;
}

export default function StartDate({ errorstartDate }: StartDateProps): JSX.Element {
  const dispatch = useDispatch();
  const noBeforeDay = dayjs().subtract(1, 'year');
  const noAfterDay = dayjs().add(1, 'year');

   const handleDateChange = (date: Date | null): void => {
    dispatch(setError({ name: 'startDate', message: '' }));
    if (!date) return;
    const isInvalid = dayjs(noBeforeDay).isAfter(date) || dayjs(noAfterDay).isBefore(date);
    if (isInvalid) {
      dispatch(setError({ name: 'startDate', message: 'Please select a valid date' }));
      return;
    } else {
      dispatch(setError({ name: 'startDate', message: '' }));
      dispatch(setField({ name: 'startDate', value: dayjs(date).format('DD/MM/YYYY') }));
    }
  };

  return (
    <>
      <div className='form-group box_startDate'>
        <p>Start Date</p>
        <div className='box_Input' style={{ display: 'flex', position: 'relative' }}>
          <DatePicker
            label='Start Date Select'
            minDate={noBeforeDay.toDate()}
            maxDate={noAfterDay.toDate()}
            views={['year', 'month', 'day']}
            // value={startDate}
            onChange={handleDateChange}
            sx={{
              '& .MuiInputBase-input': {
                height: '25px',
                width: '160px',
                margin: '10px',
              },
            }}
          />
          {errorstartDate ? <p className='errorMessage'>{errorstartDate}</p> : ''}
        </div>
      </div>
    </>
  );
}