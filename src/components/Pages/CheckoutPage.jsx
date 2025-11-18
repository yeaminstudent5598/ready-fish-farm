import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useCart from '@/Hooks/useCart';
import useAxiosSecure from '@/Hooks/useAxiosSecure'; 
import useAuth from '@/Hooks/useAuth'; 
import { useQueryClient } from '@tanstack/react-query'; // ✅ Query Client ইম্পোর্ট করুন

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle } from 'lucide-react'; 

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const CheckoutPage = () => {
    const { user } = useAuth(); 
    // ✅ নতুন useCart হুক ব্যবহার করা হচ্ছে
    const { cartItems, cartTotal, loading: cartLoading } = useCart();
    const axiosSecureInstance = useAxiosSecure();
    const navigate = useNavigate();
    const queryClient = useQueryClient(); // ✅ Query Client ইনস্ট্যান্স নিন

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            fullName: user?.displayName || '',
            phone: '', 
            address: '',
            city: '',
            postalCode: '',
            country: 'Bangladesh',
        }
    });

    const onSubmit = async (data) => {
        try {
            const orderData = {
                shippingAddress: data,
            };

            const response = await axiosSecureInstance.post('/api/orders', orderData);

            if (response.status === 201) {
                // ✅ সমাধান: কার্ট ক্যাশে ইনভ্যালিডেট করুন
                // এটি কল করলেই Navbar সহ সব জায়গায় কার্ট '0' হয়ে যাবে
                queryClient.invalidateQueries({ queryKey: ['cart'] });
                
                // সাকসেস মোডাল দেখান
                setShowSuccessModal(true);
            } else {
                toast.error('Failed to place order.');
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error(error.response?.data?.message || 'An error occurred.');
        }
    };

    const handleGoToOrders = () => {
        setShowSuccessModal(false); 
        navigate('/dashboard/my-orders'); // ✅ আপনার প্রোফাইল/অর্ডার পেজে পাঠান
    };

    if (cartLoading && cartItems.length === 0) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="h-10 w-10 animate-spin" /></div>;
    }

    if (cartItems.length === 0 && !cartLoading) { 
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold mb-4">Your cart is empty.</h2>
                <p>You cannot checkout with an empty cart.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900">Checkout</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* কলাম ১: শিপিং অ্যাড্রেস ফর্ম */}
                    <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-6 border-b pb-4">Shipping Information</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            
                            {/* ... (ফর্মের ইনপুট ফিল্ডগুলো) ... */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="fullName" className="font-semibold">Full Name</Label>
                                    <Input id="fullName" {...register("fullName", { required: "Full name is required" })} />
                                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="phone" className="font-semibold">Phone Number</Label>
                                    <Input id="phone" type="tel" {...register("phone", { required: "Phone number is required" })} />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="address" className="font-semibold">Street Address</Label>
                                <Input id="address" {...register("address", { required: "Address is required" })} />
                                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <Label htmlFor="city" className="font-semibold">City</Label>
                                    <Input id="city" {...register("city", { required: "City is required" })} />
                                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="postalCode" className="font-semibold">Postal Code</Label>
                                    <Input id="postalCode" {...register("postalCode", { required: "Postal code is required" })} />
                                    {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="country" className="font-semibold">Country</Label>
                                    <Input id="country" {...register("country", { required: "Country is required" })} />
                                    {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="text-xl font-bold mb-4">Payment Method</h3>
                                <div className="border rounded-md p-4 bg-gray-100">
                                    <p className="font-semibold text-lg">Cash on Delivery (COD)</p>
                                    <p className="text-gray-600">Pay with cash when your order is delivered.</p>
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full py-6 text-lg bg-red-600 hover:bg-red-700" 
                                disabled={isSubmitting || cartItems.length === 0}
                            >
                                {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                                {isSubmitting ? 'Placing Order...' : `Place Order (COD) - BDT ${cartTotal.toFixed(2)}`}
                            </Button>
                        </form>
                    </div>

                    {/* কলাম ২: অর্ডার সামারি */}
                    <div className="lg:col-span-1">
                        <div className="bg-white shadow-lg rounded-lg p-6 sticky top-28">
                            <h2 className="text-2xl font-bold mb-6 border-b pb-4">Order Summary</h2>
                            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                                {cartItems.map(item => (
                                    <div key={item._id} className="flex items-center gap-4">
                                        <img src={item.product.images?.[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded-md border" />
                                        <div className="flex-grow">
                                            <h3 className="font-semibold text-sm">{item.product.name}</h3>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-sm">BDT {( (item.product.pricing.discount || item.product.pricing.regular) * item.quantity ).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t space-y-3">
                                <div className="flex justify-between items-center text-md">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">BDT {cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-md">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold">FREE</span>
                                </div>
                                <div className="flex justify-between items-center text-xl font-bold mt-4">
                                    <span>Total</span>
                                    <span>BDT {cartTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* সাকসেস মোডাল */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent className="sm:max-w-md text-center p-8">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-bold text-center text-green-600 flex justify-center mb-4">
                            <CheckCircle className="h-16 w-16" />
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-2">
                        <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
                        <p className="text-gray-600">
                            Thank you for your purchase. Your (Cash on Delivery) order has been confirmed.
                        </p>
                    </div>
                    <DialogFooter className="sm:justify-center mt-6">
                        <Button 
                            onClick={handleGoToOrders}
                            className="w-full bg-red-600 hover:bg-red-700 py-6 text-lg"
                        >
                            View My Orders
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default CheckoutPage;