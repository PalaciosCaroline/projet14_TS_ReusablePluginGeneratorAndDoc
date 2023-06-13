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
