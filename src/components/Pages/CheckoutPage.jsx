import React from 'react';
import useCart from '@/Hooks/useCart';
// ... Checkout form logic will be added here

const CheckoutPage = () => {
    const { cartItems, cartTotal } = useCart();
    
    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <div>
                <h2 className="text-xl font-semibold">Order Summary</h2>
                {/* Display items and total */}
                <p>Total: BDT {cartTotal.toFixed(2)}</p>
                {/* Add address and payment form here */}
                <button>Place Order</button>
            </div>
        </div>
    );
};

export default CheckoutPage;