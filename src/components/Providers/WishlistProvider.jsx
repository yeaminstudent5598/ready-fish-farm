import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchWishlist = async () => {
            if (user) {
                try {
                    setLoading(true);
                    const res = await axiosSecure.get('/api/wishlist');
                    setWishlistItems(res.data || []);
                } catch (error) {
                    console.error("Failed to fetch wishlist:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setWishlistItems([]);
            }
        };
        fetchWishlist();
    }, [user, axiosSecure]);

    const addToWishlist = async (product) => {
        if (!user) return toast.error("Please login to add items to the wishlist.");
        try {
            setLoading(true);
            const res = await axiosSecure.post('/api/wishlist', { productId: product._id });
            setWishlistItems(res.data);
            toast.success(`${product.name} added to wishlist!`);
        } catch (error) {
            toast.error("Failed to add to wishlist.");
        } finally {
            setLoading(false);
        }
    };
    
    const value = { wishlistItems, addToWishlist, loading, wishlistCount: wishlistItems.length };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};