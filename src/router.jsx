import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';

import BasicLayout from './Layouts/BasicLayout';
import NavbarLayout from './Layouts/NavbarLayout';
import ProtectedRoute from './Layouts/ProtectedRoute';

import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Orders from './Pages/Orders';
import Page_404 from './Pages/Page_404';

import { authLoader } from './loaders/authLoader';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route element={<BasicLayout />}>
      <Route
        index
        loader={authLoader}
        element={<Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<SignUp />}
      />
    </Route>

    <Route path="/" element={<NavbarLayout />}>
      <Route element={<ProtectedRoute />}>
        <Route index path="/orders" element={<Orders />} />
      </Route>
    </Route>

    <Route path="*" element={<Page_404 />} />
  </>
));

export default router;