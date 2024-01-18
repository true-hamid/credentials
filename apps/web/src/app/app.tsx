import PreLaunch from './preLaunch/preLaunch';
// import AppRouter from '../core/routing';
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useGlobalStore } from '@global-store';
import PreLoginRouter from '../core/routing/pre-login/routers';

export function App() {
  function Layout() {
    return (
      <div>
        <AuthStatus />

        <ul>
          <li>
            <Link to="/">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>

        <Outlet />
      </div>
    );
  }
  function AuthStatus() {
    const { session, clearSession } = useGlobalStore();
    const navigate = useNavigate();

    if (!session?.authToken) {
      return <p>You are not logged in.</p>;
    }

    return (
      <p>
        Welcome USER!{' '}
        <button
          onClick={() => {
            clearSession();
            navigate('/');
          }}
        >
          Sign out
        </button>
      </p>
    );
  }

  function PublicPage() {
    return <h3>Public</h3>;
  }

  function ProtectedPage() {
    return <h3>Protected</h3>;
  }

  function RequireAuth({ children }: { children: JSX.Element }) {
    const { session } = useGlobalStore();
    const location = useLocation();

    if (!session?.authToken) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }
  return (
    <PreLaunch>
      <PreLoginRouter />
    </PreLaunch>
  );
}

export default App;
