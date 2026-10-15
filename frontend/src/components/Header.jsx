import { MdMenu, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Read the saved user safely (returns null if missing or broken)
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export const Header = ({ title, onMenuClick }) => {
  const navigate = useNavigate();
  const user = getUser();
  const initial = user?.firstName?.[0]?.toUpperCase() ?? "U";

  // Remove the saved login data and go back to login
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="cursor-pointer text-2xl text-body md:hidden"
          aria-label="Open menu"
        >
          <MdMenu />
        </button>
        <h1 className="text-lg font-semibold text-heading">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div
          onClick={logOut}
          title={user?.email}
          className="cursor-pointer flex size-10 items-center justify-center rounded-full bg-primary font-semibold text-white"
        >
          {initial}
        </div>
      </div>
    </header>
  );
};
