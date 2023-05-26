import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setField } from '../store/newEmployeeEntreeSlice';
import { RootState } from './../store/index';

export default function BoxName() {
  const dispatch = useDispatch();
  const newEmployeeEntree = useSelector(
    (state: RootState) => state.newEmployeeEntree
  );
  const {errorfirstname, errorlastname,firstname,lastname} = newEmployeeEntree;

  useEffect(() => {
    if (!firstname) {
      dispatch(setError({ name: 'firstname', message: '' }));
    }
    if (!lastname) {
      dispatch(setError({ name: 'lastname', message: '' }));
    }
  }, [dispatch, firstname, lastname]);

  function handleInputNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const formattedValue =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().toString();
    dispatch(setField({ name, value: formattedValue }));
    dispatch(setError({ name, message: '' }));
  }

  return (
    <div className="boxName">
      <div
        className="box_input"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <label htmlFor="first-name">First Name</label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            id="first-name"
            name="firstname"
            onChange={handleInputNameChange}
            className={errorfirstname ? 'errorBorder' : ''}
          />
          {errorfirstname ? (
            <p className="errorMessage" data-testid="error-firstname">
              {errorfirstname}
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
      <div
        className="box_input"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <label htmlFor="last-name">Last Name</label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            id="last-name"
            name="lastname"
            onChange={handleInputNameChange}
            className={errorlastname ? 'errorBorder' : ''}
          />
          {errorlastname ? (
            <p className="errorMessage" data-testid="error-lastname">
              {errorlastname}
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
