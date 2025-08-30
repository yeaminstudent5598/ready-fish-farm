import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import useCart from '@/Hooks/useCart';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, loading } = useCart();

    if (loading && cartItems.length === 0) {
        return <div className="text-center py-20">Loading Cart...</div>;
    }

    // ✅ অসম্পূর্ণ বা মুছে ফেলা প্রোডাক্ট ফিল্টার করা হচ্ছে
    const validCartItems = cartItems.filter(item => item.product);

    if (validCartItems.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
                <Link to="/"><Button>Continue Shopping</Button></Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="mx-auto max-w-4xl px-4">
                <h1 className="text-4xl font-extrabold text-center mb-10">Shopping Cart</h1>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    {/* Cart Items */}
                    <div className="space-y-4">
                        {validCartItems.map(item => (
                            <div key={item._id} className="flex items-center gap-4 border-b pb-4">
                                <img src={item.product.images?.[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded-md" />
                                <div className="flex-grow">
                                    <h3 className="font-semibold">{item.product.name}</h3>
                                    <p className="text-red-600 font-bold">BDT {item.product.pricing.discount || item.product.pricing.regular}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button 
                                        variant="outline" 
                                        size="icon" 
                                        className="h-8 w-8" 
                                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)} 
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-10 text-center font-bold">{item.quantity}</span>
                                    <Button 
                                        variant="outline" 
                                        size="icon" 
                                        className="h-8 w-8" 
                                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-gray-500 hover:text-red-600" 
                                    onClick={() => removeFromCart(item.product._id)}
                                >
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-8 pt-6 border-t">
                        <div className="flex justify-between items-center text-xl font-bold">
                            <span>Subtotal</span>
                            <span>BDT {cartTotal.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <Link to="/checkout">
                                <Button className="w-full py-6 text-lg bg-red-600 hover:bg-red-700">Proceed to Checkout</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;