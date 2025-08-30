import { useState } from "react";
import { FaShoppingCart, FaUser, FaHeart, FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { MdDashboard } from "react-icons/md";
import { Button } from "@/components/ui/button";
import useCart from "@/Hooks/useCart";
import { useWishlist } from "@/components/Providers/WishlistProvider";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    
    const { user, logOut } = useAuth();
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();
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
        { path: "/fish&seafoods", label: "Fish & Seafood" },
        { path: "/steaks/fillets", label: "Steaks & Fillets" },
        { path: "/chickenAndDuck", label: "Chicken & Duck" },
        { path: "/beef-&-Mutton", label: "Beef & Mutton" },
    ];

    return (
        <header className="shadow-md fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800">
            {/* ========== Desktop Navbar ========== */}
            <div className="hidden md:flex items-center justify-between px-6 py-3 max-w-7xl mx-auto gap-4">
                <div className="flex items-center gap-4 flex-shrink-0">
                    <Link to="/">
                        <img src="https://i.ibb.co/ksQ8xc5Q/Amer-Sadi-Logo-05.png" alt="Logo" className="h-14"/>
                    </Link>
                    <div className="relative">
                        <Button variant="outline" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <FaBars className="mr-2" /> Categories <FaAngleDown className={`ml-2 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                        </Button>
                        {dropdownOpen && (
                            <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-md shadow-lg z-50">
                                {navLinks.map(({ path, label }) => (
                                    <Link key={label} to={path} onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-grow flex items-center gap-4 max-w-xl">
                    <div className="flex-grow flex border rounded-md">
                        <input type="text" placeholder="Search for products..." className="w-full px-4 py-2 rounded-l-md text-sm focus:outline-none dark:bg-gray-700 dark:text-white" />
                        <button className="px-4 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-r-md">Search</button>
                    </div>
                    <Link to="/offer">
                        <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold whitespace-nowrap">📢 OFFERS</Button>
                    </Link>
                </div>
                
                <div className="flex items-center gap-6 text-gray-700 dark:text-gray-200">
                    <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaHeart className="text-xl" />
                        {wishlistCount > 0 && <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{wishlistCount}</span>}
                    </Link>
                    <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaShoppingCart className="text-xl" />
                        {cartCount > 0 && <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>}
                    </Link>
                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-600"></div>
                    {user ? (
                        <div className="relative">
                            <button onClick={() => setProfileDropdown(!profileDropdown)}><img src={user.photoURL} alt="profile" className="w-10 h-10 rounded-full border-2 border-red-500"/></button>
                            {profileDropdown && (
                                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-700 border dark:border-gray-600 shadow-lg rounded w-48 text-sm z-50">
                                    <div className="p-3 border-b dark:border-gray-600">
                                        <p className="font-semibold truncate">{user.displayName}</p>
                                    </div>
                                    <NavLink to="/dashboard" onClick={() => setProfileDropdown(false)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2"><MdDashboard /> Dashboard</NavLink>
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="font-semibold hover:text-red-600 transition-colors">Login</Link>
                    )}
                </div>
            </div>

            {/* ========== Mobile Navbar & Drawer ========== */}
            <div className="flex md:hidden items-center justify-between px-4 py-3">
                <button onClick={() => setMobileMenuOpen(true)}>
                    <FaBars className="text-2xl text-gray-700" />
                </button>
                <Link to="/">
                    <img src="https://i.ibb.co/ksQ8xc5Q/Amer-Sadi-Logo-05.png" alt="Logo" className="h-10"/>
                </Link>
                <div className="flex items-center gap-4">
                    <Link to="/cart" className="relative"><FaShoppingCart className="text-xl" />{cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>}</Link>
                </div>
            </div>
            
            {mobileMenuOpen && (
                <>
                    <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setMobileMenuOpen(false)}></div>
                    <div className="fixed top-0 left-0 w-72 h-full bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="font-bold text-lg">Menu</h2>
                            <button onClick={() => setMobileMenuOpen(false)}><FaTimes /></button>
                        </div>
                        <div className="p-4 flex flex-col gap-2">
                            {navLinks.map(({ path, label }) => (
                                <Link to={path} key={label} onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-red-600">{label}</Link>
                            ))}
                            <div className="border-t my-4"></div>
                            {user ? (
                                <>
                                    <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="py-2 flex items-center gap-2"><MdDashboard /> Dashboard</NavLink>
                                    <button onClick={handleLogout} className="text-left py-2 text-red-600 font-semibold">Logout</button>
                                </>
                            ) : (
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="py-2 flex items-center gap-2"><FaUser /> Login / Register</Link>
                            )}
                        </div>
                    </div>
                </>
            )}
        </header>
    );
};

export default Navbar;