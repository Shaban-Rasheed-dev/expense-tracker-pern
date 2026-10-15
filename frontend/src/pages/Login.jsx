import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../apis/axios";

export const Login = () => {
  const naviagte = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/login", form);
      // Save the token so the interceptor can attach it to later requests
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);
      naviagte("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-heading outline-none focus:border-primary";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 md:p-8 shadow-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-heading">Welcome back</h1>
          <p className="text-sm text-body">Login to your expense tracker</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={inputClass}
          />

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full rounded-lg bg-primary px-3 py-2 font-medium text-white hover:bg-primary-hover disabled:opacity-50"
          >
            {loading ? "Loging ..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-body">
          Don't have an account?
          <Link
            to="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
