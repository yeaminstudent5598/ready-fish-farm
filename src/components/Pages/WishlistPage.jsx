import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../Providers/WishlistProvider';

const WishlistPage = () => {
    const { wishlistItems } = useWishlist();

    if (wishlistItems.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h2>
                <p className="text-gray-600 mb-6">Save your favorite items here to shop them later.</p>
                <Link to="/">
                    <Button>Discover Products</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4">
                <h1 className="text-4xl font-extrabold text-center mb-10">My Wishlist</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlistItems.map(product => (
                        <div key={product._id} className="group relative flex flex-col rounded-xl border bg-white overflow-hidden shadow-sm">
                            <Link to={`/product/${product.slug}`} className="flex-grow">
                                <div className="aspect-square w-full overflow-hidden">
                                    <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-cover"/>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                                    <p className="text-red-600 font-bold text-lg mt-2">BDT {product.pricing.discount || product.pricing.regular}</p>
                                </div>
                            </Link>
                             <div className="p-4 pt-0 border-t flex gap-2">
                                <Button className="flex-1">
                                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;