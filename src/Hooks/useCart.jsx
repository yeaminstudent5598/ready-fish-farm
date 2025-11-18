import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useMemo } from 'react';
import { toast } from 'react-hot-toast';

const useCart = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecureInstance = useAxiosSecure();
    const queryClient = useQueryClient();

    // 1. Fetch Cart Data
    const { data: cartItems = [], isLoading: cartLoading, refetch: refetchCart } = useQuery({
        queryKey: ['cart', user?.email],
        enabled: !authLoading && !!user?.email, // ইউজার লোড হওয়ার পর এবং লগইন থাকলেই কল হবে
        queryFn: async () => {
            try {
                const res = await axiosSecureInstance.get('/api/cart');
                return res.data;
            } catch (error) {
                console.error("Failed to fetch cart", error);
                return []; // এরর হলে খালি অ্যারে রিটার্ন
            }
        },
    });

    // 2. Memoized Cart Total
    const cartTotal = useMemo(() => {
        return cartItems
            .filter(item => item.product) // ডিলিট হয়ে যাওয়া প্রোডাক্ট বাদ দিন
            .reduce((total, item) => {
                const price = item.product.pricing.discount || item.product.pricing.regular;
                return total + (price * item.quantity);
            }, 0);
    }, [cartItems]);

    // 3. Mutation Function (Add, Update, Remove)
    const mutation = useMutation({
        mutationFn: async ({ productId, quantity }) => {
            // quantity 0 হলে ডিলিট রিকোয়েস্ট পাঠাবে
            if (quantity === 0) {
                return axiosSecureInstance.delete(`/api/cart/${productId}`);
            }
            // না হলে POST রিকোয়েস্ট পাঠাবে (যা অ্যাড/আপডেট করে)
            return axiosSecureInstance.post('/api/cart', { productId, quantity });
        },
        onSuccess: () => {
            // সফল হলে, কার্ট ক্যাশে ইনভ্যালিডেট করুন
            // এর ফলে Navbar সহ সবজায়গায় কার্ট অটো-আপডেট হবে
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update cart.");
        }
    });

    // 4. Helper Functions
    const addToCart = (product) => {
        toast.success(`"${product.name}" added to cart!`);
        // শুধু productId পাঠালেই সার্ভার quantity 1 বাড়িয়ে দেবে
        mutation.mutate({ productId: product._id });
    };

    const updateQuantity = (productId, newQuantity) => {
        // নতুন quantity সার্ভারে পাঠাবে (সার্ভার এটি set করবে)
        mutation.mutate({ productId, quantity: newQuantity });
    };
    
    const removeFromCart = (productId) => {
        toast.error("Item removed from cart.");
        // quantity 0 দিলেও সার্ভার ডিলিট করে দেবে
        mutation.mutate({ productId, quantity: 0 }); 
    };

    return {
        cartItems: cartItems.filter(item => item.product), // ফিল্টার করা আইটেম
        cartTotal,
        refetchCart,
        loading: cartLoading || mutation.isPending,
        
        // ফাংশন
        addToCart,
        updateQuantity,
        removeFromCart,
    };
};

export default useCart;