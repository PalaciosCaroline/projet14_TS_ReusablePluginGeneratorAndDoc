import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { InputField } from './InputField';
import DropdownState from './DropdownState';

export default function FieldsetAddress(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <fieldset className="address">
      <legend>Address</legend>

      <InputField name="street" />

      <InputField name="city" />

      <DropdownState />

      <InputField name="zipCode" type="number" />
    </fieldset>
  );
}
