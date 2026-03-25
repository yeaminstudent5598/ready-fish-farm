import { useState } from "react";
import { FaShoppingCart, FaUser, FaHeart, FaBars, FaTimes, FaAngleDown, FaHome, FaFire, FaHistory, FaSearch } from "react-icons/fa";
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
    const [showSearch, setShowSearch] = useState(false);
    
    const { user, logOut } = useAuth();
    const { cartItems } = useCart();
    const cartCount = cartItems.length;
    const { wishlistCount } = useWishlist();
    
    const navigate = useNavigate();
    const [isAdmin, isAdminLoading] = useAdmin();
    const axiosPublic = useAxiosPublic();

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
            setShowSearch(false);
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
        <>
            {/* Desktop Navbar */}
            <header className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 h-[70px] lg:h-[85px]">
                <div className="flex items-center justify-between px-4 max-w-[1400px] mx-auto w-full h-full">
                    {/* Left Side: Logo & Categories */}
                    <div className="flex items-center gap-6 h-full">
                        <Link to="/" className="flex items-center h-full">
                            <img 
                                src="/pixel-&-Code-eco.png" 
                                alt="Logo" 
                                className="h-[60px] xl:h-[70px] w-auto object-contain hover:scale-105 transition-transform duration-200"
                            />
                        </Link>
                        
                        <div className="relative">
                            <Button 
                                variant="outline" 
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="border-gray-200 hover:bg-gray-50 hover:text-[#f97316] font-medium px-4 h-10 flex items-center gap-2"
                            >
                                <FaBars className="text-gray-500" /> Categories <FaAngleDown className={`text-xs transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                            </Button>
                            
                            {dropdownOpen && (
                                <div className="absolute top-full left-0 mt-4 w-64 bg-white border border-gray-100 rounded-lg shadow-2xl z-50 max-h-[400px] overflow-y-auto py-2 animate-in fade-in zoom-in-95 duration-200">
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
                                                className="block px-6 py-3 text-sm text-gray-600 hover:bg-[#fff7ed] hover:text-[#f97316] transition-colors font-medium border-b border-transparent hover:border-orange-100 last:border-0"
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

                    {/* Middle: Nav Links */}
                    <nav className="hidden xl:flex items-center gap-2 mx-4">
                        {categories.slice(0, 3).map((cat) => (
                            <NavLink 
                                key={cat._id} 
                                to={`/category/${cat.slug}`}
                                className={({ isActive }) => `
                                    px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap
                                    ${isActive 
                                        ? "text-[#f97316] bg-orange-50" 
                                        : "text-gray-600 hover:text-[#f97316] hover:bg-gray-50"
                                    }
                                `}
                            >
                                {cat.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Right Side: Search & Actions */}
                    <div className="flex-grow flex justify-end items-center gap-4 max-w-2xl">
                         <div className="relative group w-full max-w-md">
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="w-full pl-5 pr-12 py-2.5 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#f97316] focus:ring-2 focus:ring-orange-100 outline-none transition-all text-sm shadow-sm" 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                                onKeyDown={handleKeyDown}
                            />
                            <button 
                                onClick={handleSearch}
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-white hover:bg-gray-100 rounded-full text-gray-500 hover:text-[#f97316] transition-colors shadow-sm"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    
                        <div className="flex items-center gap-3">
                            <Link to="/deals">
                                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-full px-5 h-9 shadow-lg shadow-red-100 hover:shadow-red-200 transition-all transform hover:-translate-y-0.5">
                                    OFFERS
                                </Button>
                            </Link>

                            <div className="flex items-center gap-2 text-gray-600">
                                <Link to="/wishlist" className="relative p-2.5 hover:bg-gray-100 rounded-full transition-all group">
                                    <FaHeart className="text-xl group-hover:text-red-500 transition-colors" />
                                    {wishlistCount > 0 && <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm border-2 border-white">{wishlistCount}</span>}
                                </Link>
                                <Link to="/cart" className="relative p-2.5 hover:bg-gray-100 rounded-full transition-all group">
                                    <FaShoppingCart className="text-xl group-hover:text-[#f97316] transition-colors" />
                                    {cartCount > 0 && <span className="absolute top-0 right-0 bg-[#f97316] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm border-2 border-white">{cartCount}</span>}
                                </Link>
                            </div>
                            
                            <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
                            
                            {user ? (
                                <div className="relative">
                                    <button 
                                        onClick={() => setProfileDropdown(!profileDropdown)} 
                                        className="flex items-center gap-2 hover:bg-gray-50 rounded-full p-1 pr-3 transition-all border border-transparent hover:border-gray-200"
                                    >
                                        <img src={user.photoURL} alt="profile" className="w-9 h-9 rounded-full object-cover border-2 border-gray-100 flex-shrink-0"/>
                                        <div className="hidden 2xl:block text-left">
                                            <p className="text-xs font-bold text-gray-700 leading-tight">{user.displayName?.split(' ')[0]}</p>
                                            <p className="text-[10px] text-gray-400 leading-tight">Member</p>
                                        </div>
                                        <FaAngleDown className="text-xs text-gray-400 hidden 2xl:block" />
                                    </button>

                                    {profileDropdown && (
                                        <div className="absolute right-0 mt-4 bg-white border border-gray-100 shadow-2xl rounded-xl w-64 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                                            <div className="px-5 py-4 border-b border-gray-50 mb-2 bg-gray-50/50">
                                                <p className="font-bold text-gray-800 truncate">{user.displayName}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                            {isAdminLoading ? <span className="block px-4 py-2 text-gray-500 text-sm">Loading...</span> : (
                                                <Link 
                                                    to={isAdmin ? "/dashboard/admin-home" : "/dashboard/user-home"} 
                                                    onClick={() => setProfileDropdown(false)} 
                                                    className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-[#fff7ed] hover:text-[#f97316] flex items-center gap-3 transition-colors font-medium"
                                                >
                                                    <MdDashboard className="text-lg"/> {isAdmin ? "Admin Panel" : "My Dashboard"}
                                                </Link>
                                            )}
                                            <Link to="/dashboard/my-orders" onClick={() => setProfileDropdown(false)} className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-[#fff7ed] hover:text-[#f97316] flex items-center gap-3 transition-colors font-medium">
                                                <FaShoppingCart className="text-lg"/> My Orders
                                            </Link>
                                            <div className="border-t border-gray-50 my-2"></div>
                                            <button onClick={handleLogout} className="block w-full text-left px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-bold">
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/login">
                                    <Button variant="ghost" size="sm" className="font-bold text-gray-700 hover:text-[#f97316] hover:bg-orange-50 px-4">Login</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Top Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 h-14 flex items-center justify-between px-3">
                <Link to="/" className="flex-1 flex justify-start h-full py-1">
                    <img src="/pixel-&-Code-eco.png" alt="Logo" className="h-full w-auto object-contain"/>
                </Link>
                
                <button 
                    onClick={() => setShowSearch(!showSearch)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <FaSearch className="text-lg text-gray-700" />
                </button>
            </div>

            {/* Mobile Search Bar - Collapsible */}
            {showSearch && (
                <div className="lg:hidden fixed top-14 left-0 right-0 z-40 bg-white border-b border-gray-100 p-3">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#f97316] outline-none text-sm font-medium" 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                        <button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f97316] p-1">
                            <Search className="w-5 h-5"/>
                        </button>
                    </div>
                </div>
            )}

            {/* Mobile Bottom Navigation - App Style */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 h-16">
                <div className="flex items-center justify-between h-full px-2">
                    
                    {/* Home */}
                    <Link to="/" className="flex-1 flex flex-col items-center justify-center gap-1 py-2 hover:bg-orange-50 rounded-lg transition-colors group">
                        <FaHome className="text-2xl text-gray-600 group-hover:text-[#f97316] transition-colors" />
                        <span className="text-[10px] font-bold text-gray-600 group-hover:text-[#f97316] transition-colors">Home</span>
                    </Link>

                    {/* Categories */}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex-1 flex flex-col items-center justify-center gap-1 py-2 hover:bg-orange-50 rounded-lg transition-colors group">
                        <FaBars className="text-2xl text-gray-600 group-hover:text-[#f97316] transition-colors" />
                        <span className="text-[10px] font-bold text-gray-600 group-hover:text-[#f97316] transition-colors">Shop</span>
                    </button>

                    {/* Deals */}
                    <Link to="/deals" className="flex-1 flex flex-col items-center justify-center gap-1 py-2 hover:bg-orange-50 rounded-lg transition-colors group">
                        <FaFire className="text-2xl text-red-600 group-hover:text-red-700 transition-colors" />
                        <span className="text-[10px] font-bold text-gray-600 group-hover:text-[#f97316] transition-colors">Deals</span>
                    </Link>

                    {/* Wishlist */}
                    <Link to="/wishlist" className="flex-1 flex flex-col items-center justify-center gap-1 py-2 hover:bg-orange-50 rounded-lg transition-colors group relative">
                        <FaHeart className="text-2xl text-gray-600 group-hover:text-red-500 transition-colors" />
                        {wishlistCount > 0 && <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white">{wishlistCount}</span>}
                        <span className="text-[10px] font-bold text-gray-600 group-hover:text-[#f97316] transition-colors">Saved</span>
                    </Link>

                    {/* Cart */}
                    <Link to="/cart" className="flex-1 flex flex-col items-center justify-center gap-1 py-2 hover:bg-orange-50 rounded-lg transition-colors group relative">
                        <FaShoppingCart className="text-2xl text-gray-600 group-hover:text-[#f97316] transition-colors" />
                        {cartCount > 0 && <span className="absolute top-1 right-1 bg-[#f97316] text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white">{cartCount}</span>}
                        <span className="text-[10px] font-bold text-gray-600 group-hover:text-[#f97316] transition-colors">Cart</span>
                    </Link>

                    {/* Account */}
                    {user ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-1 py-2 hover:bg-orange-50 rounded-lg transition-colors group cursor-pointer">
                            <img src={user.photoURL} alt="profile" className="w-7 h-7 rounded-full object-cover border-2 border-gray-300 group-hover:border-[#f97316] transition-colors" />
                            <span className="text-[10px] font-bold text-gray-600 group-hover:text-[#f97316] transition-colors">Account</span>
                        </div>
                    ) : (
                        <Link to="/login" className="flex-1 flex flex-col items-center justify-center gap-1 py-2 hover:bg-orange-50 rounded-lg transition-colors group">
                            <FaUser className="text-2xl text-gray-600 group-hover:text-[#f97316] transition-colors" />
                            <span className="text-[10px] font-bold text-gray-600 group-hover:text-[#f97316] transition-colors">Login</span>
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Category Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[99999] flex justify-start pt-14">
                    <div 
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                        onClick={() => setMobileMenuOpen(false)}
                    ></div>
                    
                    <div className="relative bg-white w-72 h-[calc(100vh-56px-64px)] shadow-2xl overflow-y-auto">
                        <div className="p-4 space-y-2">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">Categories</p>
                            {categories.map((cat) => (
                                <Link 
                                    key={cat._id} 
                                    to={`/category/${cat.slug}`} 
                                    onClick={() => setMobileMenuOpen(false)} 
                                    className="flex items-center gap-3 py-3 px-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-[#f97316] font-medium transition-colors active:scale-95"
                                >
                                    <span className="text-lg">📦</span>
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;