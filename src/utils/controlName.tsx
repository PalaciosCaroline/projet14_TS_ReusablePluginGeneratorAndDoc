/**
 * Checks if a name value is provided and validates its format. 
 * It sets an error in the state using the provided dispatch function if a name is not provided or its format is invalid.
 *
 * @param {string | null} value - The name value to check.
 * @param {(error: Error) => void} setError - The function to set the error.
 * @param {string} nameForError - The name of the error, used as a key in the errors object.
 * @param {(action: any) => void} dispatch - The dispatch function from Redux.
 * @returns {boolean} - Returns `true` if the name is provided and its format is valid, `false` otherwise.
 */
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

/**
 * Validates provided names for the first name and the last name.
 * This function uses `isValidName` internally to check each name and sets an error if a name is not provided or its format is invalid.
 *
 * @param {string} firstname - The first name to validate.
 * @param {string} lastname - The last name to validate.
 * @param {(error: Error) => void} setError - The function to set the error.
 * @param {(action: any) => void} dispatch - The dispatch function from Redux.
 * @returns {boolean} - Returns `true` if both names are valid, `false` otherwise.
 */
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
