import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export const DashboardLayout = ({ title, links }) => {
  // Sidebar open/close state (used on mobile)
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation();
  const current = links.find(
    (link) => pathname === link.path || pathname.startsWith(link.path + "/"),
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar
        title={title}
        links={links}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      {/* Dark overlay: clicking it closes the sidebar */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          title={current?.name ?? title}
          onMenuClick={() => setIsOpen(true)}
        />
        <main className="flex-1 bg-page p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
