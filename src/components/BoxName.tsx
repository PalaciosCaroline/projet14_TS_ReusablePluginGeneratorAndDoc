import React, { useEffect, ChangeEvent } from 'react';
import { InputField } from './InputField';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setField } from '../store/newEmployeeEntreeSlice';
import { RootState } from './../store/index';

// export default function BoxName() {
//   const dispatch = useDispatch();
//   const newEmployeeEntree = useSelector(
//     (state: RootState) => state.newEmployeeEntree,
//   );
//   const { errorfirstname, errorlastname, firstname, lastname } =
//     newEmployeeEntree;

//   useEffect(() => {
//     if (!firstname) {
//       dispatch(setError({ name: 'firstname', message: '' }));
//     }
//     if (!lastname) {
//       dispatch(setError({ name: 'lastname', message: '' }));
//     }
//   }, [dispatch, firstname, lastname]);

//   return (
//     <div className="boxName">
//       <div
//         className="box_input"
//         style={{ display: 'flex', alignItems: 'center' }}
//       >
//         <InputField isWrapped={true} name="firstname" error={errorfirstname} />
//       </div>
//       <div
//         className="box_input"
//         style={{ display: 'flex', alignItems: 'center' }}
//       >
//         <InputField isWrapped={true} name="lastname" error={errorlastname} />
//       </div>
//     </div>
//   );
// }

export default function BoxName() {
  const dispatch = useDispatch();
  const newEmployeeEntree = useSelector((state: RootState) => state.newEmployeeEntree);

  useEffect(() => {
    if (!newEmployeeEntree.firstname) {
      dispatch(setError({ name: 'firstname', message: '' }));
    }
    if (!newEmployeeEntree.lastname) {
      dispatch(setError({ name: 'lastname', message: '' }));
    }
  }, [dispatch, newEmployeeEntree.firstname, newEmployeeEntree.lastname]);

  const inputFieldsName = [
    { name: 'firstname'},
    { name: 'lastname'},
  ];

  return (
    <div className="boxName">
      {inputFieldsName.map((input) => (
        <div
          key={input.name}
          className="box_input"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <InputField isWrapped={true} name={input.name}  error={newEmployeeEntree[`error${input.name}`]?.toString()} />
        </div>
      ))}
    </div>
  );
}
