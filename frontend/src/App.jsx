import { Navigate, Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Categories } from "./pages/Categories";
import { Transactions } from "./pages/Transactions";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { DashboardLayout } from "./layout/DashboardLayout";
import { navLinks } from "./constants/navLinks";

const App = () => {
  return (
    <>
      <Routes>
        {/* Only for logged-out users */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Only for logged-in users, all inside the dashboard layout */}
        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <DashboardLayout title="Expense Tracker" links={navLinks} />
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/transactions" element={<Transactions />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default App;
