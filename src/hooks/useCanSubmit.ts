import { FormContextValues } from 'react-hook-form';

export default <T>({ formState: { isSubmitting }, errors }: FormContextValues<T>): boolean => (
  !isSubmitting && Object.keys(errors).length === 0
);
