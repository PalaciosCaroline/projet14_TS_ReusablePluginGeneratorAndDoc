// import React from 'react'
// import { useDispatch } from 'react-redux';
// import DropdownState from './DropdownState';
// import {
//   setField
// } from './../store/newEmployeeEntreeSlice';


// export default function FieldsetAddress() {
//   const dispatch = useDispatch();

//   function handleInputChange(event) {
//     const { name, value } = event.target;
//     dispatch(setField({ name, value }));
//   }

//   return (
//         <fieldset className="address">
//             <legend>Address</legend>

//             <label htmlFor="street">Street</label>
//             <input id="street" type="text" name='street' onChange={handleInputChange}/>

//             <label htmlFor="city">City</label>
//             <input id="city" type="text" name='city' onChange={handleInputChange}/>

//            <DropdownState/>

//             <label htmlFor="zip-code">Zip Code</label>
//             <input id="zip-code" name='zipCode' type="number" onChange={handleInputChange}/>

//         </fieldset>
//   )
// }


import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import DropdownState from './DropdownState';
import { setField } from '../store/newEmployeeEntreeSlice';

export default function FieldsetAddress(): JSX.Element {
const dispatch = useDispatch();

function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
const { name, value } = event.target;
// const newValue = name === 'city' ? value.toUpperCase() : value;
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
);
}

// import React, { ChangeEvent, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import DropdownState from './DropdownState';
// import { setField } from '../store/newEmployeeEntreeSlice';

// interface City {
//   id: number;
//   name: string;
//   lat: number;
//   lon: number;
//   country: string;
// }

// export default function FieldsetAddress(): JSX.Element {
//   const dispatch = useDispatch();
//   const [cities, setCities] = useState<City[]>([]);
//   const [search, setSearch] = useState('');

//   function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
//     const { name, value } = event.target;
//     dispatch(setField({ name, value }));
//     setSearch(value);

//     // appel de l'API pour récupérer les villes correspondant à la recherche
//     fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`)
//       .then(response => response.json())
//       .then(data => setCities(data))
//       .catch(error => console.error(error));
//   }

//   function handleCitySelect(city: City): void {
//     // mise à jour de l'input de ville avec le nom de la ville sélectionnée
//     dispatch(setField({ name: 'city', value: city.name }));
//     setSearch(city.name);
//     setCities([]);
//   }

//   return (
//     <fieldset className="address">
//       <legend>Address</legend>
//       <label htmlFor="street">Street</label>
//       <input id="street" type="text" name="street" onChange={handleInputChange} />

//       <label htmlFor="city">City</label>
//       <input id="city" type="text" name="city" value={search} onChange={handleInputChange} />
//       {cities.length > 0 && (
//         <ul>
//           {cities.map(city => (
//             <li key={city.id} onClick={() => handleCitySelect(city)}>
//               {city.name}, {city.country}
//             </li>
//           ))}
//         </ul>
//       )}

//       <DropdownState />

//       <label htmlFor="zip-code">Zip Code</label>
//       <input id="zip-code" name="zipCode" type="number" onChange={handleInputChange} />
//     </fieldset>
//   );
// }