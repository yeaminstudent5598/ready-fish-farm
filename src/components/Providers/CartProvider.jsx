import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { CartContext } from '@/Hooks/useCart';

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // ব্যবহারকারী লগইন করলে তার কার্টের তথ্য ডাটাবেস থেকে লোড করার জন্য
    useEffect(() => {
        const fetchCart = async () => {
            if (user) {
                try {
                    setLoading(true);
                    const res = await axiosSecure.get('/api/cart');
                    setCartItems(res.data || []);
                } catch (error) {
                    console.error("Failed to fetch cart:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setCartItems([]);
            }
        };
        fetchCart();
    }, [user, axiosSecure]);

    // কার্টে প্রোডাক্ট যোগ করার ফাংশন
    const addToCart = async (product, quantity = 1) => {
        if (!user) return toast.error("Please login to add items to the cart.");
        try {
            setLoading(true);
            const res = await axiosSecure.post('/api/cart', { productId: product._id, quantity });
            setCartItems(res.data);
            toast.success(`${product.name} added to cart!`);
        } catch (error) {
            toast.error("Failed to add item to cart.");
        } finally {
            setLoading(false);
        }
    };

    // কার্ট থেকে প্রোডাক্ট বাদ দেওয়ার ফাংশন
    const removeFromCart = async (productId) => {
        try {
            setLoading(true);
            const res = await axiosSecure.delete(`/api/cart/${productId}`);
            setCartItems(res.data);
            toast.success("Item removed from cart.");
        } catch (error) {
            toast.error("Failed to remove item.");
        } finally {
            setLoading(false);
        }
    };

    // প্রোডাক্টের সংখ্যা (quantity) আপডেট করার ফাংশন
    const updateQuantity = async (productId, quantity) => {
        try {
            setLoading(true);
            const res = await axiosSecure.patch('/api/cart/update', { productId, quantity });
            setCartItems(res.data);
        } catch (error) {
            toast.error("Failed to update quantity.");
        } finally {
            setLoading(false);
        }
    };

    // কার্টের মোট মূল্য গণনা করা
    const cartTotal = cartItems.reduce((total, item) => {
        const price = item.product?.pricing?.discount || item.product?.pricing?.regular || 0;
        return total + price * item.quantity;
    }, 0);

    // Context এর মাধ্যমে যে ভ্যালুগুলো পাঠানো হবে
    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        loading,
        cartCount: cartItems.length,
        cartTotal,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};