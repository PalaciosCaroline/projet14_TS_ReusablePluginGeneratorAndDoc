import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../store/index';
import { setField, setError } from '../store/employeeFormStateSlice';

/**
 * `InputFieldProps` is an interface for the InputField component props.
 * @interface
 * @property {string} label - The label of the input field.
 * @property {string} name - The name of the input field.
 * @property {'text' | 'number'} type - The type of the input field.
 * @property {string} error - The error message for the input field.
 * @property {boolean} isWrapped - Whether the input field should be wrapped in a div.
 */
interface InputFieldProps {
  label?: string;
  name: string;
  type?: 'text' | 'number';
  error?: string;
  isWrapped?: boolean;
}

/**
 * `InputField` is a functional React component.
 * It renders an input field with a label and optional error message.
 * @component
 * @param {InputFieldProps} { label, name, error, type = 'text', isWrapped = false } - The properties for the InputField component.
 * @returns {JSX.Element} The rendered InputField component.
 */
export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  error,
  type = 'text',
  isWrapped = false,
}) => {
  const dispatch = useDispatch();
  const inputValue = useSelector((state: RootState) =>
    state.employeeFormState.formValues[name]?.toString(),
  );
  const [hasValue, setHasValue] = useState(inputValue !== "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setHasValue(event.target.value !== "");
    if (type === 'text') {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    dispatch(setField({ name: name, value }));
    dispatch(setError({ name: name, message: '' }));
    
  };

  const isFirstNameOrLastName = name === 'firstname' || name === 'lastname';


const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
  if (event.target.value === "") {
    setHasValue(false);
  }
};

  const inputComponent = (
    <input
      id={name}
      name={name}
      type={type}
      value={inputValue}
      onChange={handleInputChange}
      // onFocus={handleFocus}
      onBlur={handleBlur}
      // placeholder={name}
      className={error ? ' errorBorder' : ''}
    />
  );
  const inputElement = (
    <>
      {/* <label htmlFor={name}>
        {label ? label : name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      {isWrapped ? (
        <div style={{ position: 'relative' }}>
          {inputComponent}
          {error ? (
            <p className="errorMessage" data-testid={`error-${name}`}>
              {error}
            </p>
          ) : (
            ''
          )}
        </div>
      ) : (
        inputComponent
      )} */}
{/* <div style={{position:'relative'}}> */}
{/* <div className="form__linput" style={{position:'relative'}}> */}
<div className="form-item" >
{inputComponent}
      <label className={hasValue ? 'up' : ''} htmlFor={name}> {label ? label : name.charAt(0).toUpperCase() + name.slice(1)}</label>
      {/* </div> */}
      {error ? (
            <p className="errorMessage" data-testid={`error-${name}`}>
              {error}
            </p>
          ) : (
            ''
          )}
    </div>
    </>
  );

  return isFirstNameOrLastName ? (
    <div
      key={name}
      className="box_input"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      {inputElement}
    </div>
  ) : (
    inputElement
  );
};
