import { MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";

export const Sidebar = ({ links, title, isOpen, onClose }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 flex h-full w-64 flex-col gap-2 overflow-y-auto border-r border-gray-200 bg-white p-4 transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="mb-4 flex items-center justify-between px-3">
        <h1 className="text-xl font-bold text-primary">{title}</h1>
        <button
          onClick={onClose}
          className="cursor-pointer text-2xl text-body md:hidden"
          aria-label="Close menu"
        >
          <MdClose />
        </button>
      </div>

      {links.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2 font-medium ${
              isActive
                ? "bg-primary text-white hover:bg-primary-hover"
                : "text-body hover:bg-page"
            }`
          }
        >
          <item.icon className="text-xl" /> {item.name}
        </NavLink>
      ))}
    </aside>
  );
};
