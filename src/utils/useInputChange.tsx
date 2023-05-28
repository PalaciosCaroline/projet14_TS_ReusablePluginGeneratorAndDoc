
import { useDispatch } from 'react-redux';
import { setField, setError } from './../store/newEmployeeEntreeSlice'; 

export function useInputChange(type: 'text' | 'number') {
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

    dispatch(setField({ name, value: newValue }));
    dispatch(setError({ name, message: '' }));
  };

  return handleInputChange;
}