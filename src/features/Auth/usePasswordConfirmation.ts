import useDidUpdate from '@rooks/use-did-update';
import { FormContextValues } from 'react-hook-form';

type PasswordConfirmationFormData = {
  password: string,
  passwordConfirmation: string,
}

export default <T extends PasswordConfirmationFormData>({
  watch, formState, errors, triggerValidation,
}: FormContextValues<T>) => {
  const password = watch('password');

  useDidUpdate(() => {
    if (formState.isSubmitted && !errors.password) {
      triggerValidation('passwordConfirmation');
    }
  }, [password]);

  return password;
};
