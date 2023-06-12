export default function isDate(
  value: string | null,
  setError: (error: Error) => void,
  nameForError: string,
  dispatch: (action: any) => void,
): boolean {
  const errorName = nameForError.replace(/\s/g, '');
  dispatch(setError({ name: errorName, message: '' }));
  if (!value) {
    dispatch(
      setError({
        name: errorName,
        message: `The ${nameForError.toLocaleLowerCase()} is required`,
      }),
    );
    return false;
  } else {
    dispatch(setError({ name: errorName, message: '' }));
    return true;
  }
}

export const validateDates = (
  dateOfBirth: string,
  startDate: string,
  setError: (error: Error) => void,
  dispatch: (action: any) => void,
) => {
  let isDateValid = true;
  isDateValid =
    isDate(dateOfBirth, setError, 'date Of Birth', dispatch) && isDateValid;
  isDateValid =
    isDate(startDate, setError, 'start Date', dispatch) && isDateValid;
  return isDateValid;
};
