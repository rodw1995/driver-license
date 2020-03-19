import { useAuthContext } from '../features/Auth/AuthProvider';

export default (): string => {
  const { user } = useAuthContext();

  if (!user) {
    throw new Error('No authenticated user');
  }

  return user.getUsername();
};
