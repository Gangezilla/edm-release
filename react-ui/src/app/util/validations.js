//you can define whatever validation requirements you need to in this file, and then import into the form you're creating.
//further examples, check the docs: http://redux-form.com/6.4.3/examples/syncValidation/
//validators are for error level checks, warnings are to alert the customer to something.

const required = value => value ? undefined : 'Required';

const selectOptionValue = value =>
value === null || value === '' || value === undefined || value === 'select' || value === 'Select'
|| value === 'please select' || value === 'Please Select' ? 'Required' : undefined;

const email = value =>
value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
'Invalid email address' : undefined;

const confirmEmail = comparisonValue => value => value && value !== comparisonValue ? 'The email you entered does not match, please try again' : undefined;

const confirmPassword = comparisonValue => value => value && value !== comparisonValue ? 'The password you entered does not match, please try again' : undefined;

const passwordValidation = value => value &&
!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(value) ? 'Your password needs at least 8 characters, an uppercase letter, a lowercase letter, a number, and a special character.' : undefined;

const postcode = value =>
value && !/^\d{3,4}$/i.test(value) ?
'Invalid post code' : undefined;

const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const numberWarn = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

const minLengthWarn = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

const valueLength = length => value =>
  value && value.length !== length ? `Must be ${length} characters` : undefined;

const length4 = valueLength(4);
const minLength10 = minLength(10);

const validators = {
	required,
	selectOptionValue,
	email,
	confirmEmail,
	confirmPassword,
	postcode,
	number,
	length4,
	minLength10,
	minLength,
	maxLength,
	valueLength,
  passwordValidation,
}

const warnings = {
	numberWarn,
	minLengthWarn
}

export { validators, warnings };
