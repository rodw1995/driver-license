import { renderHook } from '@testing-library/react-hooks';
import { FormContextValues } from 'react-hook-form';
import useCanSubmit from '../useCanSubmit';

type FormData = { email: string };

describe('useCanSubmit', () => {
  it('should be defined', () => {
    expect(useCanSubmit).toBeDefined();
  });

  it('should return true if not submitting and no errors', () => {
    const form = {
      formState: { isSubmitting: false },
      errors: {},
    } as FormContextValues<FormData>;

    const hook = renderHook(() => useCanSubmit(form));
    expect(hook.result.current).toBeTruthy();
  });

  it('should return false on submitting', () => {
    const form = {
      formState: { isSubmitting: true },
      errors: {},
    } as FormContextValues<FormData>;

    const hook = renderHook(() => useCanSubmit(form));
    expect(hook.result.current).toBeFalsy();
  });

  it('should return false on errors', () => {
    const form = {
      formState: { isSubmitting: false },
      errors: { email: { type: 'required' } },
    } as FormContextValues<FormData>;

    const hook = renderHook(() => useCanSubmit(form));
    expect(hook.result.current).toBeFalsy();
  });
});
