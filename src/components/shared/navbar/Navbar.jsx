import { useState } from "react";
import { FaShoppingCart, FaUser, FaHeart, FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import { MdDashboard } from "react-icons/md";
import { Button } from "@/components/ui/button";
import useCart from "@/Hooks/useCart";
import { useWishlist } from "@/components/Providers/WishlistProvider";
import useAdmin from "../../../Hooks/useAdmin"; 
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); 
    
    const { user, logOut } = useAuth();
    const { cartItems } = useCart();
    const cartCount = cartItems.length;
    const { wishlistCount } = useWishlist();
    
    const navigate = useNavigate();
    const [isAdmin, isAdminLoading] = useAdmin();
    const axiosPublic = useAxiosPublic();

    // ডাটাবেস থেকে ক্যাটাগরি লোড করা
    const { data: categories = [], isLoading: isCatLoading } = useQuery({
        queryKey: ['nav-categories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/categories');
            return res.data.filter(cat => cat.isNav === true);
        }
    });

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?q=${searchTerm}`); 
            setSearchTerm(""); 
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

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

    return (
        <header className="shadow-sm fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
            {/* ========== Desktop Navbar ========== */}
            <div className="hidden lg:flex items-center justify-between px-4 py-3 max-w-[1400px] mx-auto">
                
                {/* 1. Left Side: Logo & Categories Dropdown */}
                <div className="flex items-center gap-4 xl:gap-6 flex-shrink-0">
                    <Link to="/">
                        <img src="/pixel-&-Code-eco.png" alt="Logo" className="h-16 xl:h-16 object-contain"/>
                    </Link>
                    
                    <div className="relative">
                        <Button 
                            variant="outline" 
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="border-gray-200 hover:bg-gray-50 hover:text-[#f97316] transition-all font-medium px-3 h-10"
                        >
                            <FaBars className="mr-2 text-gray-500" /> Categories <FaAngleDown className={`ml-2 text-xs transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                        </Button>
                        
                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-gray-100 rounded-lg shadow-xl z-50 max-h-[400px] overflow-y-auto py-2 animate-in fade-in zoom-in-95 duration-200">
                                {isCatLoading ? (
                                    <div className="p-4 space-y-3">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                ) : categories.length > 0 ? (
                                    categories.map((category) => (
                                        <Link 
                                            key={category._id} 
                                            to={`/category/${category.slug}`} 
                                            onClick={() => setDropdownOpen(false)} 
                                            className="block px-5 py-2.5 text-sm text-gray-600 hover:bg-[#fff7ed] hover:text-[#f97316] transition-colors font-medium"
                                        >
                                            {category.name}
                                        </Link>
                                    ))
                                ) : (
                                    <p className="px-4 py-2 text-sm text-gray-500">No categories found</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Middle: Dynamic Links (Limited to 3) */}
                {/* ✅ ফিক্স: মাত্র ৩টি ক্যাটাগরি দেখানো হবে যাতে জায়গা না ভাঙ্গে */}
                <nav className="hidden xl:flex items-center gap-1 flex-shrink-0 mx-4">
                    {categories.slice(0, 3).map((cat) => (
                        <NavLink 
                            key={cat._id} 
                            to={`/category/${cat.slug}`}
                            className={({ isActive }) => `
                                px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap
                                ${isActive 
                                    ? "text-[#f97316] bg-[#fff7ed]" 
                                    : "text-gray-600 hover:text-[#f97316] hover:bg-gray-50"
                                }
                            `}
                        >
                            {cat.name}
                        </NavLink>
                    ))}
                </nav>

                {/* 3. Middle Right: Search Bar */}
                {/* ✅ ফিক্স: flex-grow এবং min-width দেওয়া হয়েছে */}
                <div className="flex-grow flex justify-end max-w-md mx-4">
                     <div className="relative group w-full">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#f97316] focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm" 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            onKeyDown={handleKeyDown}
                        />
                        <button 
                            onClick={handleSearch}
                            className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-transparent hover:bg-gray-200 rounded-full text-gray-500 hover:text-[#f97316] transition-colors"
                        >
                            <Search className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                
                {/* 4. Right Side: Icons & Profile */}
                <div className="flex items-center gap-3 flex-shrink-0">
                    <Link to="/deals">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-full px-4 h-8 shadow-md shadow-red-100">
                            OFFERS
                        </Button>
                    </Link>

                    <div className="flex items-center gap-1 text-gray-600">
                        <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition-all group">
                            <FaHeart className="text-lg group-hover:text-red-500 transition-colors" />
                            {wishlistCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[9px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center shadow-sm">{wishlistCount}</span>}
                        </Link>
                        <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-all group">
                            <FaShoppingCart className="text-lg group-hover:text-[#f97316] transition-colors" />
                            {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-[#f97316] text-white text-[9px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center shadow-sm">{cartCount}</span>}
                        </Link>
                    </div>
                    
                    <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>
                    
                    {user ? (
                        <div className="relative">
                            <button 
                                onClick={() => setProfileDropdown(!profileDropdown)} 
                                className="flex items-center gap-2 hover:bg-gray-50 rounded-full p-1 pr-2 transition-colors border border-transparent hover:border-gray-200"
                            >
                                {/* ✅ ফিক্স: ছবি ফিক্সড সাইজ এবং shrink-0 */}
                                <img src={user.photoURL} alt="profile" className="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0"/>
                                
                                {/* ✅ ফিক্স: নাম শুধুমাত্র খুব বড় স্ক্রিনে দেখাবে, নাহলে হাইড থাকবে */}
                                <span className="text-xs font-medium text-gray-700 max-w-[80px] truncate hidden 2xl:block">
                                    {user.displayName?.split(' ')[0]}
                                </span>
                                <FaAngleDown className="text-xs text-gray-400 hidden 2xl:block" />
                            </button>

                            {profileDropdown && (
                                <div className="absolute right-0 mt-3 bg-white border border-gray-100 shadow-xl rounded-lg w-56 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                                    <div className="px-4 py-3 border-b border-gray-50 mb-2">
                                        <p className="font-semibold text-gray-800 truncate">{user.displayName}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    {isAdminLoading ? <span className="block px-4 py-2 text-gray-500 text-sm">Loading...</span> : (
                                        <Link 
                                            to={isAdmin ? "/dashboard/admin-home" : "/dashboard/user-home"} 
                                            onClick={() => setProfileDropdown(false)} 
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#fff7ed] hover:text-[#f97316] flex items-center gap-2 transition-colors"
                                        >
                                            <MdDashboard className="text-lg"/> {isAdmin ? "Admin Panel" : "My Dashboard"}
                                        </Link>
                                    )}
                                    <Link to="/dashboard/my-orders" onClick={() => setProfileDropdown(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#fff7ed] hover:text-[#f97316] flex items-center gap-2 transition-colors">
                                        <FaShoppingCart className="text-lg"/> My Orders
                                    </Link>
                                    <div className="border-t border-gray-50 my-2"></div>
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium">
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login">
                            <Button variant="ghost" size="sm" className="font-semibold text-gray-700 hover:text-[#f97316] hover:bg-orange-50">Login</Button>
                        </Link>
                    )}
                </div>
            </div>

            {/* ========== Mobile Menu (Updated) ========== */}
            <div className="flex lg:hidden items-center justify-between px-4 py-3 bg-white">
                <button onClick={() => setMobileMenuOpen(true)} className="p-2 hover:bg-gray-100 rounded-md"><FaBars className="text-xl text-gray-700" /></button>
                <Link to="/"><img src="/pixel-&-Code-eco.png" alt="Logo" className="h-8 object-contain"/></Link>
                <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full">
                    <FaShoppingCart className="text-xl text-gray-700" />
                    {cartCount > 0 && <span className="absolute top-0 right-0 bg-[#f97316] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>}
                </Link>
            </div>
            
            {mobileMenuOpen && (
                <>
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setMobileMenuOpen(false)}></div>
                    <div className="fixed top-0 left-0 w-[80%] max-w-sm h-full bg-white z-50 shadow-2xl transform transition-transform duration-300 overflow-y-auto">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="font-bold text-lg text-gray-800">Menu</h2>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full transition-colors"><FaTimes className="text-xl" /></button>
                        </div>
                        
                        <div className="p-4 space-y-4">
                             <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Search products..." 
                                    className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#f97316] outline-none text-sm" 
                                    value={searchTerm} 
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                    onKeyDown={handleKeyDown}
                                />
                                <button onClick={() => { handleSearch(); setMobileMenuOpen(false); }} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f97316]"><Search className="w-4 h-4"/></button>
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Categories</p>
                                {categories.map((cat) => (
                                    <Link key={cat._id} to={`/category/${cat.slug}`} onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-md text-gray-700 hover:bg-orange-50 hover:text-[#f97316] text-sm font-medium transition-colors">
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                            
                            <div className="border-t border-gray-100 pt-4">
                                {user ? (
                                    <>
                                        <div className="flex items-center gap-3 mb-4 px-2">
                                            <img src={user.photoURL} alt="user" className="w-10 h-10 rounded-full border border-gray-200 object-cover"/>
                                            <div>
                                                <p className="font-semibold text-sm text-gray-800">{user.displayName}</p>
                                                <p className="text-xs text-gray-500 truncate max-w-[150px]">{user.email}</p>
                                            </div>
                                        </div>
                                        <Link to={isAdmin ? "/dashboard/admin-home" : "/dashboard/user-home"} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2.5 px-3 rounded-md text-gray-700 hover:bg-gray-100 text-sm font-medium">
                                            <MdDashboard className="text-lg"/> Dashboard
                                        </Link>
                                        <button onClick={handleLogout} className="w-full flex items-center gap-3 py-2.5 px-3 rounded-md text-red-600 hover:bg-red-50 text-sm font-medium text-left mt-2">
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex justify-center w-full py-2.5 bg-[#f97316] text-white rounded-md font-semibold text-sm hover:bg-orange-700 transition-colors">
                                        Login / Register
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
};

export default Navbar;