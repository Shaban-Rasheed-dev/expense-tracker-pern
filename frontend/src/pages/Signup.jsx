import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { api } from "../apis/axios.js";
import { toast } from "react-toastify";

export const Signup = () => {
  // show/hide state for each password field
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  //for navigating to other pages
  const navigate = useNavigate();
  // state for form fields
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
  });
  //when form submit it will be loading..
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check both passwords match before calling the API
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    setLoading(true);
    try {
      const data = { ...form };
      // backend does not need confirmPassword
      delete data.confirmPassword;
      // Phone is optional: remove it if the user left it empty
      if (!data.phoneNo.trim()) delete data.phoneNo;
      //success response
      const response = await api.post("/auth/signup", data);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  //class for all input fields
  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 md:py-2 text-heading outline-none placeholder:text-body/50 focus:border-primary focus:ring-2 focus:ring-primary/20";
  //eye button sits inside the input on the right
  const eyeClass =
    "absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-body";
  //label class for all labels
  const labelClass = "mb-1 block text-sm font-medium text-heading";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10 ">
      <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-4 md:mb-6 ">
          <h1 className="text-2xl font-bold text-heading">Create account</h1>
          <p className="text-sm text-body">
            Start tracking your income and expenses
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-4">
          <div className="grid md:grid-cols-2 gap-3 md:gap-4">
            {/* Row 1: names */}
            <div className="">
              <label htmlFor="firstName" className={labelClass}>
                First name:
              </label>
              <input
                id="firstName"
                name="firstName"
                placeholder="Ali"
                value={form.firstName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClass}>
                Last name:
              </label>
              <input
                id="lastName"
                name="lastName"
                placeholder="Khan"
                value={form.lastName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Row 2: email and phone */}
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
            <div>
              <label htmlFor="phoneNo" className={labelClass}>
                Phone (optional):
              </label>
              <input
                id="phoneNo"
                name="phoneNo"
                placeholder="03xxxxxxxxx"
                value={form.phoneNo}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* Row 3: passwords */}
            <div>
              <label htmlFor="password" className={labelClass}>
                Password:
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
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
            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm password:
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
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
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg bg-primary px-3 py-2.5 font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-body">
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
