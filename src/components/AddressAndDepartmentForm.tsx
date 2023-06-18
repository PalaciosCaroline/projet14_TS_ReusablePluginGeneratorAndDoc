import React from 'react';
import { InputField } from './InputField';
import Dropdown from './Dropdown';
import { states, State } from '../utils/states';
import { departmentOptions } from '../utils/department';

/**
 * This component renders a form for user's address and department input.
 * The form includes two dropdowns for selecting a state and a department.
 *
 * @returns JSX.Element
 *
 */
export default function AddressAndDepartmentForm(): JSX.Element {
  /**
   * Creates an array of strings containing the names of each state
   * from the `states` array.
   *
   * @type {string[]}
   */
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
