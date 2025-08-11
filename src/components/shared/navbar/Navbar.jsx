import { useState } from "react";
import {
  FaPhoneAlt,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaAngleDown,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("User logged out successfully.");
      navigate("/");
      setProfileDropdown(false);
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const navLinks = [
    ["fish&seafoods", "64edf18d8f810.png", "Fish & Seafood"],
    ["steaks/fillets", "64edf552cd4ed.png", "Steaks & Fillets"],
    ["chickenAndDuck", "64edf552c6fc6.png", "Chicken & Duck"],
    ["beef-&-Mutton", "64edf55295a87.png", "Beef & Mutton"],
    ["combo-Pack", "64edf55288919.png", "Combo Pack"],
    ["dried-Fish", "64edf55259813.png", "Dried Fish"],
    ["marinatedCooked", "64edf55252c9c.png", "Marinated & Cooked"],
    ["pasteSpice", "64edf551db049.png", "Pasta & Spice"],
  ];

  return (
    <nav className="shadow-md fixed top-0 left-0 right-0 z-50 bg-white">
      {/* ========== Desktop Navbar ========== */}
      <div className="hidden md:flex items-center justify-between px-4 py-3 md:py-4">
        <Link to="/">
          <img
            src="https://i.ibb.co/ksQ8xc5Q/Amer-Sadi-Logo-05.png"
            alt="Logo"
            className="h-10 md:h-14"
          />
        </Link>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-[#8BC34A] text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaBars />
            BROWSE CATEGORIES
            <FaAngleDown
              className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-56 bg-white border shadow-md z-50">
              {navLinks.map(([path, , label]) => (
                <Link
                  key={label}
                  to={`/${path}`}
                  className="block px-4 py-2 hover:bg-[#f2f2f2] text-[#333] border-b last:border-0"
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          to="/offer"
          className="bg-[#f97316] hover:bg-orange-700 text-white px-4 py-2 rounded ml-4"
        >
          📢 OFFER
        </Link>

        <div className="flex-grow mx-4 max-w-xl flex border rounded">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full px-4 py-2 rounded-l-md text-sm focus:outline-none"
          />
          <button className="px-4 text-[#40a944]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-4 relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="focus:outline-none"
              >
                <img
                  src={user?.photoURL}
                  alt="profile"
                  className="w-8 h-8 rounded-full border-2 border-[#f97316]"
                />
              </button>
              {profileDropdown && (
                <div className="absolute right-0 mt-2 bg-white border shadow-md rounded w-36 text-sm z-50">
                  <NavLink
                    to="/dashboard"
                    onClick={() => setProfileDropdown(false)}
                    className="block px-4 py-2 hover:bg-orange-100 flex items-center gap-2"
                  >
                    <MdDashboard className="text-lg" /> Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left hover:bg-orange-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex btn items-center gap-1 text-sm">
              <FaUser /> LOGIN / REGISTER
            </Link>
          )}
          <Link to="/cart" className="relative flex items-center gap-1 text-sm">
            <FaShoppingCart />
          </Link>
        </div>
      </div>

      {/* ========== Mobile Navbar ========== */}
      <div className="flex md:hidden items-center justify-between px-4 py-2">
        <button onClick={() => setMobileMenuOpen(true)}>
          <FaBars className="text-xl text-[#40a944]" />
        </button>
        <div className="flex-grow mx-4 flex border rounded">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-2 py-1 text-sm focus:outline-none"
          />
          <button className="px-2 text-[#40a944]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-3 relative">
          <Link to="/cart">
            <FaShoppingCart className="text-lg text-[#40a944]" />
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="text-lg text-[#40a944] focus:outline-none"
              >
                <img
                  src={user?.photoURL}
                  alt="profile"
                  className="w-8 h-8 rounded-full border-2 border-[#f97316]"
                />
              </button>
              {profileDropdown && (
                <div className="absolute right-0 mt-2 bg-white border shadow-md rounded w-36 text-sm z-50">
                  <NavLink
                    to="/dashboard"
                    onClick={() => {
                      setProfileDropdown(false);
                      setMobileMenuOpen(false);
                    }}
                    className="block px-4 py-2 hover:bg-orange-100 flex items-center gap-2"
                  >
                    <MdDashboard className="text-lg" /> Dashboard
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      setProfileDropdown(false);
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-orange-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 text-sm text-[#40a944]"
            >
              <FaUser /> LOGIN / REGISTER
            </Link>
          )}
        </div>
      </div>

      {/* ========== Mobile Drawer ========== */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-30 z-40"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-bold text-[#40a944] text-lg">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-2 text-[#497954]">
              {navLinks.map(([path, , label]) => (
                <Link
                  to={`/${path}`}
                  key={label}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 hover:text-[#40a944]"
                >
                  {label}
                </Link>
              ))}
              {user && (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-sm text-[#497954] hover:text-orange-600"
                  >
                    <MdDashboard className="text-lg" /> Dashboard
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-sm text-red-600 hover:underline mt-2"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
