import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../apis/axios.js";
import { toast } from "react-toastify";

export const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: "",
  });
  //when form submit it will see loading..
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Phone is optional: remove it if the user left it empty
      const data = { ...form };
      if (!data.phoneNo.trim()) delete data.phoneNo;
      //success response
      const response = await api.post("/signup", data);
      toast.success(response.data.message);
      navigate("/login");
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
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-heading">Create account</h1>
          <p className="text-sm text-body">
            Start tracking your income and expenses
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
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
          <input
            name="phoneNo"
            placeholder="Phone (optional)"
            value={form.phoneNo}
            onChange={handleChange}
            className={inputClass}
          />

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full rounded-lg bg-primary px-3 py-2 font-medium text-white hover:bg-primary-hover disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-body">
          Already have an account?
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
