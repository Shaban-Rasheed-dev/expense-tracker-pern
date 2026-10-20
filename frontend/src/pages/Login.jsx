import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { api } from "../apis/axios";
import { loginSchema } from "../validators/authValidator";
import { saveAuth } from "../utils/auth";

export const Login = () => {
  // Navigate to the dashboard after successful login
  const navigate = useNavigate();

  // Store the email and password input values
  const [form, setForm] = useState({
    email: "",
    password: "Shaban.123",
  });

  // Control password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Track the login request state
  const [loading, setLoading] = useState(false);

  // Update the field that the user types into
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit login details to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      return toast.error(result.error.issues[0].message);
    }
    setLoading(true);

    try {
      // Send email and password to the login API
      const response = await api.post("/auth/login", result.data);
      // Save the token and user (both encrypted) for future requests
      saveAuth(response.data.token, response.data.user);

      // Show success feedback and open the dashboard
      toast.success(response.data.message);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log(error);

      // Display the backend error or a fallback message
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      // Stop loading whether login succeeds or fails
      setLoading(false);
    }
  };

  // Reusable styles for consistent input height and spacing
  const inputClass =
    "w-full h-10 md:h-11 rounded-lg border border-gray-300 bg-white px-3 text-base text-heading outline-none placeholder:text-body/50 focus:border-primary focus:ring-2 focus:ring-primary/20";

  // Position the eye button inside the password field
  const eyeClass = "absolute right-3 top-1/2 -translate-y-1/2 text-body";

  // Keep label typography and spacing consistent
  const labelClass = "mb-1 block text-sm font-medium text-heading";

  return (
    // Center the login card with responsive outer spacing
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8">
      {/* Responsive card: full width on mobile, maximum 448px */}
      <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
        {/* Heading and subtitle */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-heading">Welcome back</h1>

          <p className="text-sm text-body">Login to your expense tracker</p>
        </div>

        {/* Arrange the form fields and button vertically */}
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 md:gap-4.5"
        >
          {/* Email field */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email:
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="ali@example.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Password field with show/hide functionality */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Password:
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className={`${inputClass} pr-10`}
                required
              />

              {/* Toggle password visibility without submitting the form */}
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword(!showPassword)}
                className={eyeClass}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Full-width button with loading feedback */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-primary py-2  mt-2 md:py-2.5    font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Link to the signup page */}
        <p className="mt-4 text-center text-sm text-body">
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
