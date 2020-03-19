import { ValidationOptions } from 'react-hook-form';

type AuthValidationRules = {
  email: ValidationOptions,
  password: ValidationOptions,
  newPassword: ValidationOptions,
  passwordConfirmation: (password: string) => ValidationOptions,
  confirmationCode: ValidationOptions,
};

const passwordValidation = {
  required: 'Password is required',
};

const authValidationRules: AuthValidationRules = {
  email: {
    required: 'Email is required',
    pattern: { value: /^\S+@\S+$/i, message: 'Not a valid email' },
  },
  password: passwordValidation,
  newPassword: {
    ...passwordValidation,
    minLength: { value: 8, message: 'Password must be at least 8 characters long' },
  },
  passwordConfirmation: (password: string) => ({
    validate: (value) => value === password || 'Password doesn\'t match',
  }),
  confirmationCode: {
    required: 'Code is required',
  },
};

export default authValidationRules;
