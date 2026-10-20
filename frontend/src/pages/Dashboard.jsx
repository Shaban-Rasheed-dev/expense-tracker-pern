import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../apis/axios";
import { clearAuth } from "../utils/auth";
export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load the dashboard data when the page opens
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await api.get("/dashboard");
        setUser(response.data.user);
      } catch (error) {
        // 401 = missing, invalid or expired token
        if (error.response?.status === 401) {
          clearAuth();
          navigate("/login", { replace: true });
          return;
        }
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };
    loadDashboard();
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="text-xl font-bold text-heading">
        Welcome, {user.firstName}
      </h2>
      <p className="mt-1 text-sm text-body">
        Your income and expense summary will appear here.
      </p>
    </div>
  );
};
