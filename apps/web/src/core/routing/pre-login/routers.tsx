import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SignIn from '../../../features/auth/sign-in';
import SignUp from '../../../features/auth/sign-up';

export default function PreLoginRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route
          path="/protected"
          element={
            <RequireAuth>
              <ProtectedPage />
            </RequireAuth>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}
