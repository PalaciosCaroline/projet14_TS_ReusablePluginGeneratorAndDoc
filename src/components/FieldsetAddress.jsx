import React from 'react'
import { useDispatch } from 'react-redux';
import DropdownState from './DropdownState';
import {
  setField
} from './../store/newEmployeeEntreeSlice';


export default function FieldsetAddress() {
  const dispatch = useDispatch();

  function handleInputChange(event) {
    const { name, value } = event.target;
    dispatch(setField({ name, value }));
  }

  return (
        <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text" name='street' onChange={handleInputChange}/>

            <label htmlFor="city">City</label>
            <input id="city" type="text" name='city' onChange={handleInputChange}/>

           <DropdownState/>

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" name='zipCode' type="number" onChange={handleInputChange}/>

        </fieldset>
  )
}
