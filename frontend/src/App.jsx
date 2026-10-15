import { Navigate, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Any unknown URL goes to signup for now */}
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </>
  );
}

export default App;
