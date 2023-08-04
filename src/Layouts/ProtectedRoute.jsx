import { Outlet, Navigate, useLocation } from "react-router-dom"
import { LOCAL_STORAGE_TOKEN_NAME } from "../../config";

const ProtectedRoute = () => {
  const location = useLocation();
  const tokenStr = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
  const token = JSON.parse(tokenStr);

  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{
          message: "You must log in first.",
          from: location.pathname
        }}
        replace
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute