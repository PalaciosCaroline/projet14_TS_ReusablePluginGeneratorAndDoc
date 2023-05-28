// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setError, setField } from '../store/newEmployeeEntreeSlice';
// import { RootState } from './../store/index';

// export default function BoxName() {
//   const dispatch = useDispatch();
//   const newEmployeeEntree = useSelector(
//     (state: RootState) => state.newEmployeeEntree
//   );
//   const {errorfirstname, errorlastname,firstname,lastname} = newEmployeeEntree;

//   useEffect(() => {
//     if (!firstname) {
//       dispatch(setError({ name: 'firstname', message: '' }));
//     }
//     if (!lastname) {
//       dispatch(setError({ name: 'lastname', message: '' }));
//     }
//   }, [dispatch, firstname, lastname]);

//   function handleInputNameChange(event: React.ChangeEvent<HTMLInputElement>) {
//     const { name, value } = event.target;
//     const formattedValue =
//       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().toString();
//     dispatch(setField({ name, value: formattedValue }));
//     dispatch(setError({ name, message: '' }));
//   }

//   return (
//     <div className="boxName">
//       <div
//         className="box_input"
//         style={{ display: 'flex', alignItems: 'center' }}
//       >
//         <label htmlFor="first-name">First Name</label>
//         <div style={{ position: 'relative' }}>
//           <input
//             type="text"
//             id="first-name"
//             name="firstname"
//             onChange={handleInputNameChange}
//             className={errorfirstname ? 'errorBorder' : ''}
//           />
//           {errorfirstname ? (
//             <p className="errorMessage" data-testid="error-firstname">
//               {errorfirstname}
//             </p>
//           ) : (
//             ''
//           )}
//         </div>
//       </div>
//       <div
//         className="box_input"
//         style={{ display: 'flex', alignItems: 'center' }}
//       >
//         <label htmlFor="last-name">Last Name</label>
//         <div style={{ position: 'relative' }}>
//           <input
//             type="text"
//             id="last-name"
//             name="lastname"
//             onChange={handleInputNameChange}
//             className={errorlastname ? 'errorBorder' : ''}
//           />
//           {errorlastname ? (
//             <p className="errorMessage" data-testid="error-lastname">
//               {errorlastname}
//             </p>
//           ) : (
//             ''
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, ChangeEvent } from 'react';
import { InputField } from './InputField';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setField } from '../store/newEmployeeEntreeSlice';
import { RootState } from './../store/index';

interface InputFieldProps {
  id: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

// const InputField: React.FC<InputFieldProps> = ({ id, name, onChange, error }) => {
//   const capitalizeFirstLetter = (event: ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target;
//     event.target.value = value.charAt(0).toUpperCase() + value.slice(1);
//     onChange(event);
//   };

//   return (
//     <>
//       <label htmlFor={id}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
//       <div style={{ position: 'relative' }}>
//         <input
//           type="text"
//           id={id}
//           name={name}
//           onInput={capitalizeFirstLetter}
//           className={error ? 'errorBorder' : ''}
//         />
//         {error ? (
//           <p className="errorMessage" data-testid={`error-${name}`}>
//             {error}
//           </p>
//         ) : (
//           ''
//         )}
//       </div>
//       </>
//   );
// };

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
      <InputField 
        isWrapped={true}
        id="first-name" 
        name="firstname" 
        onChange={handleInputNameChange} 
        error={errorfirstname} 
      /></div>
      <div
      className="box_input"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <InputField 
        isWrapped={true}
        id="last-name" 
        name="lastname" 
        onChange={handleInputNameChange} 
        error={errorlastname} 
      />
      </div>
    </div>
  );
}
