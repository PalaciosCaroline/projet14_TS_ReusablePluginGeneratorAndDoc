import React, { ChangeEvent } from 'react';
import { InputField } from './InputField';
import Dropdown from './Dropdown';
import { states, State } from '../utils/states';
import { departmentOptions } from '../utils/department';

export default function AddressAndDepartmentForm(): JSX.Element {

  const stateOptions: string[] = states.map((state: State) => state.name);

  return (
    <>
      <fieldset className="address">
        <legend>Address</legend>
        <InputField name="street" />
        <InputField name="city" />
        <Dropdown
          label="State"
          dropdownLabel="dropdownLabelState"
          placeholder="select a state"
          options={stateOptions}
          style={{ margin: '8px', width: '100%' }}
        />
        <InputField name="zipCode" type="number" />
      </fieldset>
      <Dropdown
        label="Department"
        dropdownLabel="dropdownLabelDepartment"
        placeholder="select a department"
        options={departmentOptions}
        style={{ margin: '8px', width: '100%' }}
      />
    </>
  );
}
