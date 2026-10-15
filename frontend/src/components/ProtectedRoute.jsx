import { Navigate, Outlet } from "react-router-dom";

// Allow access only when a token exists, otherwise go to login
export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
