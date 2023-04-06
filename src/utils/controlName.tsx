// type ErrorName = 'firstname' | 'lastname';

// interface Error {
//   name: ErrorName;
//   message: string;
// }

// interface SetErrorAction {
//   type: "setError";
//   payload: {
//     name: ErrorName;
//     message: string;
//   };
// }

// interface SetFieldAction {
//   type: "setField";
//   payload: {
//     field: string;
//     value: any;
//   };
// }

// type ActionType = SetErrorAction | SetFieldAction;

// interface Dispatch {
//   (action: ActionType): void;
// }

// interface ErrorSetter {
//   (error: Error): void;
// }

// function isValidName(value: string, setError: ErrorSetter, errorName: ErrorName, dispatch: Dispatch): boolean {
//   dispatch({ type: 'setError', payload: { name: errorName, message: '' } });
//   const regex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\-'\s]{0,40}$/;
//   if (value.length < 2) {
//     dispatch({ type: 'setError', payload: { name: errorName, message: `The ${errorName} is required` } });
//     return false;
//   } else if (!regex.test(value)) {
//     dispatch({ type: 'setError', payload: { name: errorName, message: `Invalid ${errorName} format` } });
//     return false;
//   } else {
//       return true;
//   }
// }

// // export const validateNames = (firstname: string, lastname: string, setError: ErrorSetter, dispatch: Dispatch): boolean => {
// //   let isNameValid: boolean = false;
// //   if (isValidName(firstname, setError, 'firstname', dispatch)) {
// //     isNameValid = true;
// //   }
// //   if (isValidName(lastname, setError, 'lastname', dispatch)) {
// //     isNameValid = true;
// //   }
// //   return isNameValid;
// // };

// export const validateNames = (firstname: string, lastname: string, setError: ErrorSetter, dispatch: Dispatch): boolean => {
//   let isNameValid: boolean = true;
//   if (!isValidName(firstname, setError, 'firstname', dispatch)) {
//     isNameValid = false;
//   }
//   if (!isValidName(lastname, setError, 'lastname', dispatch)) {
//     isNameValid = false;
//   }
//   return isNameValid;
// };
  



// function isValidName(value, setError, errorName, dispatch) {
//   dispatch(setError({ name: errorName, message: '' }));
//   const regex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\-'\s]{0,40}$/;
//     if (value.length < 2) {
//       dispatch(setError({ name: errorName, message: `The ${errorName} is required` }));
//       return false;
//     } else if (!regex.test(value)) {
//       dispatch(setError({ name: errorName, message: `Invalid ${errorName} format` }));
//       return false;
//     } else if (regex.test(value) && value.length > 1) {
//       dispatch(setError({ name: errorName, message: '' }));
//       return true;
//     }
// }


function isValidName(value: string, setError: Function, errorName: string, dispatch: Function): boolean {
  dispatch(setError({ name: errorName, message: '' }));
  const regex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ'\s-]{0,40}$/;
  if (value.length < 2) {
  dispatch(setError({ name: errorName, message: `The ${errorName} is required` }));
  return false;
  } else if (!regex.test(value)) {
  dispatch(setError({ name: errorName, message: `Invalid ${errorName} format` }));
  return false;
  } else if (regex.test(value) && value.length > 1) {
  dispatch(setError({ name: errorName, message: '' }));
  return true;
  } else {
  return false;
  }
  }

export const validateNames = (firstname:string, lastname:string, setError: Function, dispatch:Function) => {
  let isNameValid = true;
  isNameValid = isValidName(firstname, setError, 'firstname', dispatch) && isNameValid;
  isNameValid = isValidName(lastname, setError, 'lastname', dispatch) && isNameValid;
  return isNameValid;
};
  