import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { api } from "../apis/axios.js";
import { toast } from "react-toastify";
import { signupSchema } from "../validators/authValidator.js";

export const Signup = () => {
  // Control password visibility separately for both fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Navigate to another route after successful signup
  const navigate = useNavigate();

  // Store all form field values in one state object
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
  });

  // Track whether the signup request is in progress
  const [loading, setLoading] = useState(false);

  // Update only the field that the user changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate and submit the signup form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Phone is optional: leave it out of the check if the user did not type it
    const input = { ...form };
    if (!input.phoneNo.trim()) delete input.phoneNo;
    // 1. Validate on the frontend first
    const result = signupSchema.safeParse(input);
    if (!result.success) {
      return toast.error(result.error.issues[0].message);
    }
    setLoading(true);

    try {
      // Cleaned data (trimmed, lowercase email) without confirmPassword
      const data = { ...result.data };

      // Send signup data to the backend
      const response = await api.post("/auth/signup", data);

      // Show success message and redirect to login
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      // Show backend error or a fallback message
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      // Stop loading whether the request succeeds or fails
      setLoading(false);
    }
  };

  // Shared styles for all input fields
  const inputClass =
    "w-full h-10 md:h-11 rounded-lg border border-gray-300 bg-white px-3 text-base text-heading outline-none placeholder:text-body/50 focus:border-primary focus:ring-2 focus:ring-primary/20";

  // Position the eye icon inside the password input
  const eyeClass = "absolute right-3 top-1/2 -translate-y-1/2 text-body";

  // Keep label spacing and typography consistent
  const labelClass = "mb-1 block text-sm font-medium text-heading";

  return (
    // Center the card and provide spacing around it
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8">
      {/* Responsive card padding: 20px mobile, 24px small, 32px desktop */}
      <div className="w-full max-w-xl rounded-xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
        {/* Heading and subtitle */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-heading">Create account</h1>

          <p className="text-sm text-body">
            Start tracking your income and expenses
          </p>
        </div>

        {/* Stack form rows vertically with consistent spacing */}
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 md:gap-4.5"
        >
          {/* One column on mobile, two columns on medium screens and above */}
          <div className="grid grid-cols-1 gap-4 md:gap-4.5 md:grid-cols-2">
            {/* First name */}
            <div>
              <label htmlFor="firstName" className={labelClass}>
                First name:
              </label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="Ali"
                value={form.firstName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Last name */}
            <div>
              <label htmlFor="lastName" className={labelClass}>
                Last name:
              </label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Khan"
                value={form.lastName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Email */}
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
              />
            </div>

            {/* Optional phone number */}
            <div>
              <label htmlFor="phoneNo" className={labelClass}>
                Phone (optional):
              </label>

              <input
                id="phoneNo"
                name="phoneNo"
                type="tel"
                autoComplete="tel"
                placeholder="03xxxxxxxxx"
                value={form.phoneNo}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Password with show/hide button */}
            <div>
              <label htmlFor="password" className={labelClass}>
                Password:
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  className={`${inputClass} pr-10`}
                />

                {/* Keep the eye icon inside the input */}
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className={eyeClass}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Confirm password with its own visibility state */}
            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm password:
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`${inputClass} pr-10`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className={eyeClass}
                >
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          </div>

          {/* Full-width submit button */}
          <button
            type="submit"
            disabled={loading}
            className=" cursor-pointer rounded-lg bg-primary py-2 md:py-2.5 mt-2 font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        {/* Keep the login link separated from the form */}
        <p className="mt-4 text-center text-sm text-body">
          Already have an account?
          <Link
            to="/login"
            className="mx-1 font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
