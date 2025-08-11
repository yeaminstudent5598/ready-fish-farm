import { FaBoxOpen, FaUsers, FaShoppingCart, FaUserCircle, FaHome, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard, MdInventory, MdOutlineCategory, MdLogout } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAdmin from "../Hooks/useAdmin";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully!"))
      .catch((error) => toast.error("Logout failed: " + error.message));
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:flex flex-col">
        <div className="px-6 py-4 border-b border-gray-300 dark:border-gray-700">
          <Link to="/" className="text-2xl font-bold text-red-600">
            Guptodhon
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
          <ul>
            {/* Admin Navigation */}
            {isAdmin ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard/admin-dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 p-3 rounded-md bg-red-100 text-red-700 font-semibold"
                        : "flex items-center gap-3 p-3 rounded-md hover:bg-red-50 hover:text-red-600"
                    }
                  >
                    <MdDashboard className="text-xl" /> Admin Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-product"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 p-3 rounded-md bg-red-100 text-red-700 font-semibold"
                        : "flex items-center gap-3 p-3 rounded-md hover:bg-red-50 hover:text-red-600"
                    }
                  >
                    <FaBoxOpen className="text-xl" /> Manage Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/categories"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 p-3 rounded-md bg-red-100 text-red-700 font-semibold"
                        : "flex items-center gap-3 p-3 rounded-md hover:bg-red-50 hover:text-red-600"
                    }
                  >
                    <MdOutlineCategory className="text-xl" /> Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/orders"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 p-3 rounded-md bg-red-100 text-red-700 font-semibold"
                        : "flex items-center gap-3 p-3 rounded-md hover:bg-red-50 hover:text-red-600"
                    }
                  >
                    <FaShoppingCart className="text-xl" /> All Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/users"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 p-3 rounded-md bg-red-100 text-red-700 font-semibold"
                        : "flex items-center gap-3 p-3 rounded-md hover:bg-red-50 hover:text-red-600"
                    }
                  >
                    <FaUsers className="text-xl" /> Users
                  </NavLink>
                </li>
              </>
            ) : (
              // User Navigation
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 p-3 rounded-md bg-red-100 text-red-700 font-semibold"
                        : "flex items-center gap-3 p-3 rounded-md hover:bg-red-50 hover:text-red-600"
                    }
                  >
                    <MdDashboard className="text-xl" /> Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/orders"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 p-3 rounded-md bg-red-100 text-red-700 font-semibold"
                        : "flex items-center gap-3 p-3 rounded-md hover:bg-red-50 hover:text-red-600"
                    }
                  >
                    <FaShoppingCart className="text-xl" /> My Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 p-3 rounded-md bg-red-100 text-red-700 font-semibold"
                        : "flex items-center gap-3 p-3 rounded-md hover:bg-red-50 hover:text-red-600"
                    }
                  >
                    <FaUserCircle className="text-xl" /> Profile
                  </NavLink>
                </li>
              </>
            )}

            {/* Logout Button */}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-md w-full text-white bg-red-600 hover:bg-red-700 transition"
              >
                <FaSignOutAlt className="text-xl" /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              {isAdmin ? "Admin Dashboard" : "User Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="bg-gray-200 dark:bg-gray-700 rounded p-2"
              aria-label="Toggle theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <div className="flex items-center gap-3 cursor-pointer">
              <img
                className="w-10 h-10 rounded-full ring-2 ring-red-600"
                src={user?.photoURL || "/default-user.png"}
                alt="User avatar"
              />
              <div className="hidden sm:block text-gray-700 dark:text-gray-200">
                <p className="font-medium">{user?.displayName || "User"}</p>
                <p className="text-xs">{user?.email}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Outlet for nested routes */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
