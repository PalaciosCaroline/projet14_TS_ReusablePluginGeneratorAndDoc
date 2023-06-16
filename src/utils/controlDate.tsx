/**
 * Checks if a date value is provided and, if not, sets an error in the state using the provided dispatch function.
 *
 * @param {string | null} value - The date value to check.
 * @param {(error: Error) => void} setError - The function to set the error.
 * @param {string} nameForError - The name of the error, used as a key in the errors object.
 * @param {(action: any) => void} dispatch - The dispatch function from Redux.
 * @returns {boolean} - Returns `true` if the date is provided, `false` otherwise.
 */
export default function isDate(
  value: string | null,
  setError: (error: Error) => void,
  nameForError: string,
  dispatch: (action: any) => void,
): boolean {
  dispatch(setError({ name: nameForError, message: '' }));
  if (!value) {
    dispatch(
      setError({
        name: nameForError,
        message: `This date is required`,
      }),
    );
    return false;
  } else {
    dispatch(setError({ name: nameForError, message: '' }));
    return true;
  }
}

/**
 * Validates provided dates for date of birth and start date.
 * This function uses `isDate` internally to check each date and sets an error if a date is not provided.
 *
 * @param {string} dateOfBirth - The date of birth to validate.
 * @param {string} startDate - The start date to validate.
 * @param {(error: Error) => void} setError - The function to set the error.
 * @param {(action: any) => void} dispatch - The dispatch function from Redux.
 * @returns {boolean} - Returns `true` if both dates are valid, `false` otherwise.
 */
export const validateDates = (
  dateOfBirth: string,
  startDate: string,
  setError: (error: Error) => void,
  dispatch: (action: any) => void,
) => {
  let isDateValid = true;
  isDateValid =
    isDate(dateOfBirth, setError, 'dateOfBirth', dispatch) && isDateValid;
  isDateValid =
    isDate(startDate, setError, 'startDate', dispatch) && isDateValid;
  return isDateValid;
};
