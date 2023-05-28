import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../store/index';
import { setField, setError } from '../store/newEmployeeEntreeSlice';
import { useInputChange } from '../utils/useInputChange';

interface InputFieldProps {
  name: string;
  type?: 'text' | 'number';
  error?: string;
  isWrapped?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  error,
  type = 'text',
  isWrapped = false,
}) => {
  const dispatch = useDispatch();
  const inputValue = useSelector((state: RootState) =>
    state.newEmployeeEntree[name]?.toString(),
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (type === 'text') {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }

    dispatch(setField({ name, value }));
    dispatch(setError({ name, message: '' }));
  };

  const inputField = (
    <input
      id={name}
      name={name}
      type={type}
      value={inputValue}
      onChange={handleInputChange}
      className={error ? 'errorBorder' : ''}
    />
  );

  return (
    <>
      <label htmlFor={name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      {isWrapped ? (
        <div style={{ position: 'relative' }}>
          {inputField}
          {error ? (
            <p className="errorMessage" data-testid={`error-${name}`}>
              {error}
            </p>
          ) : (
            ''
          )}
        </div>
      ) : (
        inputField
      )}
    </>
  );
};
