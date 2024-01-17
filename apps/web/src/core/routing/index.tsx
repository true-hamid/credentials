import { Routes, Route } from 'react-router-dom';

import PreLoginRouter from './pre-login/routers';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<PreLoginRouter />} />

      {/* <Route path="/signup">
          <SignUp />
        </Route> */}
    </Routes>
  );
}
