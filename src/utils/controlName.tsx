function isValidName(
  value: string | null,
  setError: (error: Error) => void,
  nameForError: string,
  dispatch: (action: any) => void,
): boolean {
  const errorName = nameForError.replace(/\s/g, '');
  dispatch(setError({ name: errorName, message: '' }));
  const regex =
    /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ'\s-]{0,40}$/;
  if (!value || value.length < 2) {
    dispatch(
      setError({ name: errorName, message: `The ${nameForError} is required` }),
    );
    return false;
  } else if (value.length >= 2 && !regex.test(value)) {
    dispatch(
      setError({ name: errorName, message: `Invalid ${nameForError}     format` }),
    );
    return false;
  } else if (regex.test(value) && value.length > 1) {
    dispatch(setError({ name: errorName, message: '' }));
    return true;
  } else {
    return false;
  }
}

export const validateNames = (
  firstname: string,
  lastname: string,
  setError: (error: Error) => void,
  dispatch: (action: any) => void,
) => {
  let isNameValid = true;
  isNameValid =
    isValidName(firstname, setError, 'first name', dispatch) && isNameValid;
  isNameValid =
    isValidName(lastname, setError, 'last name', dispatch) && isNameValid;
  return isNameValid;
};
