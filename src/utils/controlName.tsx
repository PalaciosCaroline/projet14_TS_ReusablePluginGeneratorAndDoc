type ErrorName = 'firstname' | 'lastname';

interface Error {
  name: ErrorName;
  message: string;
}

interface SetErrorAction {
  type: "setError";
  payload: {
    name: ErrorName;
    message: string;
  };
}

interface SetFieldAction {
  type: "setField";
  payload: {
    field: string;
    value: any;
  };
}

type ActionType = SetErrorAction | SetFieldAction;

interface Dispatch {
  (action: ActionType): void;
}

interface ErrorSetter {
  (error: Error): void;
}

function isValidName(value: string, setError: ErrorSetter, errorName: ErrorName, dispatch: Dispatch): boolean {
  dispatch({ type: 'setError', payload: { name: errorName, message: '' } });
  const regex = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\-'\s]{0,40}$/;
  if (value.length < 2) {
    dispatch({ type: 'setError', payload: { name: errorName, message: `The ${errorName} is required` } });
    return false;
  } else if (!regex.test(value)) {
    dispatch({ type: 'setError', payload: { name: errorName, message: `Invalid ${errorName} format` } });
    return false;
  } else {
    return true;
  }
}

export const validateNames = (firstname: string, lastname: string, setError: ErrorSetter, dispatch: Dispatch): boolean => {
  let isNameValid: boolean = false;
  if (isValidName(firstname, setError, 'firstname', dispatch)) {
    isNameValid = true;
  }
  if (isValidName(lastname, setError, 'lastname', dispatch)) {
    isNameValid = true;
  }
  return isNameValid;
};
  