// import React from 'react'
// import { useDispatch } from 'react-redux';
// import { states } from '../utils/states'
// import {
//   setField
// } from './../store/newEmployeeEntreeSlice';
// import Dropdown from './Dropdown';

// export default function DropdownState() {
//   const dispatch = useDispatch();

//   function handleStateSelect(stateName) {
//     const state = states.find((s) => s.name === stateName);
//     dispatch(setField({ name: 'state', value:state.abbreviation}));
//   }

//   const stateOptions = states.map((state) => state.name);

//   return (
//     <div className='box_state'>
//       <p className='p_label'>State</p>
//     <Dropdown
//     dropdownLabel='dropdownLabelState'
//     placeholder='select a state'
//     options={stateOptions}
//     // selectedOption={stateEntree}
//     onOptionClick={(option) => handleStateSelect(option)}
//     className='selectState'
//     style={{ margin: '8px', width:'100%' }}
//     />
//     </div>
//   )
// }


import React from 'react';
import { useDispatch } from 'react-redux';
import { states, State } from '../utils/states';
import { setField } from '../store/newEmployeeEntreeSlice';
import Dropdown from './Dropdown';

export default function DropdownState(): JSX.Element {
const dispatch = useDispatch();

function handleStateSelect(stateName: string): void {
const state: State | undefined = states.find((s) => s.name === stateName);
if (state) {
dispatch(setField({ name: 'state', value: state.abbreviation }));
}
}

const stateOptions: string[] = states.map((state: State) => state.name);

return (
<div className='box_state'>
<p className='p_label'>State</p>
<Dropdown
dropdownLabel='dropdownLabelState'
placeholder='select a state'
options={stateOptions}
onOptionClick={(option: string) => handleStateSelect(option)}

style={{ margin: '8px', width: '100%' }}
/>
</div>
);
}