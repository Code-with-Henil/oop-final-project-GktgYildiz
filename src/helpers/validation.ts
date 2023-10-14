interface Validatable {
  value: string | number; // The value of the input
  required?: boolean; // If the input is required
  minLength?: number; // The minimum length of the input (for strings)
  maxLength?: number; // The maximum length of the input (for strings)
  min?: number; // The minimum value of the input (for numbers)
  max?: number; // The maximum value of the input (for numbers)
}
function validate(input: Validatable): boolean {
  let isValid = true;
  //check if the input required
  //if required check for value. value can not be null or undefined
  isValid = input.required
    ? (isValid && input.value !== undefined && input.value !== null) ||
      input.value.toString().trim().length !== 0
    : isValid;

  //check for type of input

  //if type of input is string
  isValid =
    typeof input.value === "string"
      ? isValid &&
        input.value.trim().length >= (input.minLength || 0) &&
        input.value.trim().length <= (input.maxLength || Infinity)
      : isValid;

  //if type of input is number
  isValid =
    typeof input.value === "number"
      ? isValid &&
        input.value >= (input.min || -Infinity) &&
        input.value <= (input.max || Infinity)
      : isValid;

  return isValid;
}
export { Validatable, validate };
