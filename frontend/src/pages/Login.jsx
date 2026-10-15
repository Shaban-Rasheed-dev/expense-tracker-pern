import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { api } from "../apis/axios";

export const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  // show/hide state for the password field
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login", form);
      // Save the token so the interceptor can attach it to later requests
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // add this
      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  //class for all input fields
  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-heading outline-none placeholder:text-body/50 focus:border-primary focus:ring-2 focus:ring-primary/20";
  //eye button sits inside the input on the right
  const eyeClass =
    "absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-body";
  //label class for all labels
  const labelClass = "mb-1 block text-sm font-medium text-heading";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-heading">Welcome back</h1>
          <p className="text-sm text-body">Login to your expense tracker</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ali@example.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Password with show/hide */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Password:
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={eyeClass}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-primary px-3 py-2.5 font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-body">
          Don't have an account?
          <Link
            to="/signup"
            className="mx-1 font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
