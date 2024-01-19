import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { PostLoginPaths, PreLoginPaths } from './paths';
import SignIn from '../../features/auth/sign-in';
import SignUp from '../../features/auth/sign-up';
import { ProtectedRoute } from './protected-route';
import { Profile } from '../../features/dashboard/profile';

const AppRoutes = [
  {
    path: PreLoginPaths.PATH_SIGN_IN,
    element: <SignIn />,
    protectedRoute: false,
  },
  {
    path: PreLoginPaths.PATH_SIGN_UP,
    element: <SignUp />,
    protectedRoute: false,
  },
  {
    path: PostLoginPaths.PATH_DASHBOARD,
    element: <Profile />,
    protectedRoute: true,
  },
  {
    path: '*',
    element: <SignIn />,
    protectedRoute: false,
  },
];

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {AppRoutes.map(({ path, element, protectedRoute }, index) => (
          <Route
            key={index}
            path={path}
            element={
              protectedRoute ? (
                <ProtectedRoute>{element}</ProtectedRoute>
              ) : (
                element
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
