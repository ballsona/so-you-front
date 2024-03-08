/** 문자,숫자 포함 8-30자 */
export function validatePw(password: string) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
}

/** YYYY-MM-DD */
export function validateDate(date: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  return regex.test(date);
}
