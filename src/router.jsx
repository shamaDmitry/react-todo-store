import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';

import BasicLayout from './Layouts/BasicLayout';
import NavbarLayout from './Layouts/NavbarLayout';
import ProtectedRoute from './Layouts/ProtectedRoute';

import { authLoader } from './loaders/authLoader';

import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Orders from './Pages/Orders';
import Page_404 from './Pages/Page_404';
import Todos from './Pages/Todos';
import About from './Pages/About';
import Profile from './Pages/User/Profile';

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
        loader={authLoader}
        element={<Login />}
      />
      <Route
        path="/register"
        loader={authLoader}
        element={<SignUp />}
      />
    </Route>

    <Route path="/" element={<ProtectedRoute />}>
      <Route element={<NavbarLayout />}>
        <Route index path="/orders" element={<Orders />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>

    <Route path="*" element={<Page_404 />} />
  </>
));

export default router;