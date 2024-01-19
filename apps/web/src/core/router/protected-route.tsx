import { Navigate, useLocation } from 'react-router-dom';
import { PreLoginPaths } from './paths'
import { useGlobalStore } from '@global-store';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { session, apiError } = useGlobalStore();
  const location = useLocation();

  if (!session?.authToken || apiError?.statusCode === 401) {
    return (
      <Navigate
        to={PreLoginPaths.PATH_SIGN_IN}
        state={{ from: location }}
        replace
      />
    );
  }
  return children;
};
