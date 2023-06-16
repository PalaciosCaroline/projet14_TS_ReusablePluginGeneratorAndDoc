
import { useDispatch } from 'react-redux';
import { setField, setError } from '../store/employeeFormStateSlice'; 

/**
 * Custom React Hook to handle changes in input values.
 * It dispatches actions to set the value of a field and to reset the associated error in the Redux state.
 *
 * @param {('text' | 'number')} type - The type of the input element. This is used to determine how to process the input's value.
 * @returns {(event: React.ChangeEvent<HTMLInputElement>) => void} - A function that takes an event object and dispatches actions to update the Redux state.
 * 
 */
export function useInputChange(type: 'text' | 'number'): (event: React.ChangeEvent<HTMLInputElement>) => void {
  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let newValue: string;

    if (type === 'text') {
      newValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    } else if (type === 'number') {
      newValue = value;
    } else {
      newValue = '';
    }

    dispatch(setField({ name: name, value: newValue }));
    dispatch(setError({ name: name, message: '' }));
  };

  return handleInputChange;
}