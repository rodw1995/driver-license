import { useAuthContext } from '../features/Auth/AuthProvider';

export default (): boolean => {
  const { state } = useAuthContext();

  return state === 'signedIn';
};
