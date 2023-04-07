import React from 'react'
import { useDispatch} from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {
    setField,
    setError
  } from '../store/newEmployeeEntreeSlice';

  interface DateOfBirthProps {
    errordateOfBirth: string;
  }

export default function DateOfBirth({ errordateOfBirth }: DateOfBirthProps): JSX.Element {
    const dispatch = useDispatch();
    const noBeforeDay = dayjs().subtract(90, 'year');
    const noAfterDay = dayjs().subtract(12, 'year');

    const handleDateChange = (date: Date | null): void => {
        dispatch(setError({name:'dateOfBirth', message:'' }))
        const isInvalid = dayjs(noBeforeDay).isAfter(date) || dayjs(noAfterDay).isBefore(date);
        if(isInvalid){
            dispatch(setError({name:'dateOfBirth', message:'Please select a valid date ' }))
            return;
        }else {
            dispatch(setError({name:'dateOfBirth', message:'' }))
            dispatch(setField({ name:'dateOfBirth', value: dayjs(date).format('DD/MM/YYYY') }));        
        }
    };
   
  return (
    <div className='form-group box_dateOfBirth'>       
        <p>Date of Birth</p>
        <div className='box_Input ' style={{display:'flex', position:'relative'}}>
        <DatePicker 
        label="Date of Birth Select" 
        minDate={noBeforeDay.toDate()}
        maxDate={noAfterDay.toDate()}
        views={['year', 'month', 'day']}
        onChange={handleDateChange}
        sx={{
          '& .MuiInputBase-input': {
            height: '25px',// réduit la hauteur de l'entrée
            width: '160px', 
            margin:'10px',
          },
        }}
        />
         {errordateOfBirth ? <p className='errorMessage'>{errordateOfBirth}</p> : ''}
        </div>
    </div>
  )
}
