import React, { useState, useEffect } from 'react';
import { FaBoxOpen, FaUsers, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard, MdOutlineCategory } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // থিম পরিবর্তনের জন্য স্টেট এবং ইফেক্ট
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

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

  if (isAdminLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold">
        Checking permissions...
      </div>
    );
  }

  const adminLinks = (
    <>
      <div>
        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">General</p>
        <NavLink to="/dashboard/admin-home" className={({ isActive }) => isActive ? "flex items-center gap-3 p-3 mt-2 rounded-md bg-red-100 text-red-700 font-semibold dark:bg-red-900 dark:text-white" : "flex items-center gap-3 p-3 mt-2 rounded-md hover:bg-red-50 dark:hover:bg-gray-600"}> <MdDashboard /> Admin Home </NavLink>
      </div>
      <div className='mt-4'>
        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Management</p>
        <div className='mt-2 space-y-2'>
            <NavLink to="/dashboard/manage-product" className={({ isActive }) => isActive ? "flex items-center gap-3 p-3 rounded-md bg-red-100 text-red-700 font-semibold dark:bg-red-900 dark:text-white" : "flex items-center gap-3 p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600"}> <FaBoxOpen /> Products </NavLink>
            <NavLink to="/dashboard/categories" className={({ isActive }) => isActive ? "flex items-center gap-3 p-3 rounded-md bg-red-100 text-red-700 font-semibold dark:bg-red-900 dark:text-white" : "flex items-center gap-3 p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600"}> <MdOutlineCategory /> Categories </NavLink>
            <NavLink to="/dashboard/orders" className={({ isActive }) => isActive ? "flex items-center gap-3 p-3 rounded-md bg-red-100 text-red-700 font-semibold dark:bg-red-900 dark:text-white" : "flex items-center gap-3 p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600"}> <FaShoppingCart /> Orders </NavLink>
            <NavLink to="/dashboard/users" className={({ isActive }) => isActive ? "flex items-center gap-3 p-3 rounded-md bg-red-100 text-red-700 font-semibold dark:bg-red-900 dark:text-white" : "flex items-center gap-3 p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600"}> <FaUsers /> Users </NavLink>
        </div>
      </div>
    </>
  );

  const userLinks = (
    <>
        <NavLink to="/dashboard/user-home" className={({ isActive }) => isActive ? "flex items-center gap-3 p-3 rounded-md bg-red-100 text-red-700 font-semibold dark:bg-red-900 dark:text-white" : "flex items-center gap-3 p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600"}> <MdDashboard /> My Dashboard </NavLink>
        <NavLink to="/dashboard/my-orders" className={({ isActive }) => isActive ? "flex items-center gap-3 p-3 rounded-md bg-red-100 text-red-700 font-semibold dark:bg-red-900 dark:text-white" : "flex items-center gap-3 p-3 rounded-md hover:bg-red-50 dark:hover:bg-gray-600"}> <FaShoppingCart /> My Orders </NavLink>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-700 shadow-md transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <Link to="/" className="text-2xl font-bold text-red-600">
            ReadyFood Farm
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 text-gray-600 dark:text-gray-300">
            {isAdmin ? adminLinks : userLinks}
        </nav>

        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-600">
          <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-md w-full text-white bg-red-600 hover:bg-red-700 transition">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-700 shadow-md">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden">
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="flex items-center gap-4">
                <button onClick={toggleTheme} className="bg-gray-200 dark:bg-gray-600 rounded p-2 text-xl" aria-label="Toggle theme">
                  {theme === "light" ? "🌙" : "☀️"}
                </button>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <img className="w-10 h-10 rounded-full ring-2 ring-red-500" src={user?.photoURL} alt="User avatar" />
                            <div className="hidden sm:block text-gray-700 dark:text-gray-200">
                                <p className="font-medium">{user?.displayName}</p>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link to="/dashboard/profile" className='w-full'>Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to="/dashboard/settings" className='w-full'>Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-800">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;