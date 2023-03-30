import React from 'react'
import { useDispatch } from 'react-redux';
import { states } from '../utils/states'
import {
  setField
} from './../store/newEmployeeEntreeSlice';
import Dropdown from './Dropdown';

export default function DropdownState() {
  const dispatch = useDispatch();

  function handleStateSelect(stateName) {
    const state = states.find((s) => s.name === stateName);
    dispatch(setField({ name: 'state', value:state.abbreviation}));
  }

  const stateOptions = states.map((state) => state.name);

  return (
    <div className='box_state'>
      <p className='p_label'>State</p>
    <Dropdown
    dropdownLabel='dropdownLabelState'
    placeholder='select a state'
    options={stateOptions}
    // selectedOption={stateEntree}
    onOptionClick={(option) => handleStateSelect(option)}
    className='selectState'
    style={{ margin: '8px', width:'100%' }}
    />
    </div>
  )
}
