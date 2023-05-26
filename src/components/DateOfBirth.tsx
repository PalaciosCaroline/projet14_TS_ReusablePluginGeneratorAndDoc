import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { RootState } from './../store/index';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { setField, setError } from './../store/newEmployeeEntreeSlice';

interface DateOfBirthProps {
  className: string;
  errordateOfBirth: string | null;
  setInitialValues: React.Dispatch<
    React.SetStateAction<{
      startDateInput: null | dayjs.Dayjs;
      dateOfBirthInput: dayjs.Dayjs | null;
    }>
  >;
  initialValues: {
    startDateInput: dayjs.Dayjs | null;
    dateOfBirthInput: dayjs.Dayjs | null;
  };
}

export default function DateOfBirth({
  errordateOfBirth,
  initialValues,
  setInitialValues,
}: DateOfBirthProps): JSX.Element {
  const dateOfBirth = useSelector(
    (state: RootState) => state.newEmployeeEntree.dateOfBirth,
  );
  const dispatch = useDispatch();
  const noBeforeDay = dayjs().subtract(90, 'year');
  const noAfterDay = dayjs().subtract(12, 'year');

  useEffect(() => {
    if (!dateOfBirth || !initialValues.dateOfBirthInput) {
      dispatch(setError({ name: 'dateOfBirth', message: '' }));
    }
  }, []);

  const handleDateChange = (date: any): void => {
    dispatch(setError({ name: 'dateOfBirth', message: '' }));
    setInitialValues({ ...initialValues, dateOfBirthInput: date });
    const isInvalid = noBeforeDay > date || date > noAfterDay;
    if (isInvalid) {
      dispatch(
        setError({
          name: 'dateOfBirth',
          message: 'Please select a valid date ',
        }),
      );
      return;
    } else {
      dispatch(setError({ name: 'dateOfBirth', message: '' }));
      dispatch(
        setField({
          name: 'dateOfBirth',
          value: dayjs(date).format('DD/MM/YYYY'),
        }),
      );
    }
  };

  return (
    <div className="form-group box_dateOfBirth">
      <p className='text_dateOfBirth'>Date of Birth</p>
      <div
        className="box_Input "
        style={{ display: 'flex', position: 'relative' }}
      >
        <DatePicker
          label="Date of Birth Select"
          minDate={noBeforeDay}
          maxDate={noAfterDay}
          value={initialValues.dateOfBirthInput}
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
        {errordateOfBirth ? (
          <p className="errorMessage">{errordateOfBirth}</p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
