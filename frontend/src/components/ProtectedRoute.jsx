import { Navigate, Outlet } from "react-router-dom";
import { clearAuth, isValidToken } from "../utils/auth";

// Allow access only when a token exists, otherwise go to login
export const ProtectedRoute = () => {
  // Allow access only with a valid, non-expired token
  if (!isValidToken()) {
    clearAuth();
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
