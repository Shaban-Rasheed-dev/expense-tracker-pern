import { Navigate, Outlet } from "react-router-dom";
import { clearAuth, isValidToken } from "../utils/auth";

// Logged-in users skip login/signup and go to the dashboard
export const PublicRoute = () => {
  if (isValidToken()) {
    return <Navigate to="/dashboard" replace />;
  }

  // An expired or broken token should not stay behind
  clearAuth();
  return <Outlet />;
};
