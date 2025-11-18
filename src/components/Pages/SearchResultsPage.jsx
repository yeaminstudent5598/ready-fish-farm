import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import useCart from '@/Hooks/useCart';
import { ShoppingCart, Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q'); // URL থেকে সার্চ টেক্সট নেওয়া (যেমন: ?q=fish)
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const axiosPublic = useAxiosPublic();
    const { addToCart, loading: isCartLoading } = useCart();

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                // ব্যাকএন্ডে সার্চ কুয়েরি পাঠানো
                const res = await axiosPublic.get(`/api/products?search=${query}`);
                setProducts(res.data);
            } catch (err) {
                console.error("Search failed:", err);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchSearchResults();
        }
    }, [query, axiosPublic]);

    // ডিসকাউন্ট ক্যালকুলেশন
    const calculateDiscount = (regular, discount) => {
        if (!regular || !discount) return 0;
        return Math.round(((regular - discount) / regular) * 100);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-[60vh]"><Loader2 className="h-10 w-10 animate-spin text-[#f97316]" /></div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen mt-18 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Search className="text-[#f97316]" />
                        Search Results for "{query}"
                    </h1>
                    <p className="text-gray-600 mt-1">{products.length} products found</p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <p className="text-xl text-gray-500">No products matches your search.</p>
                        <Link to="/">
                            <Button className="mt-4 bg-[#f97316] hover:bg-[#ea6a10]">Browse All Products</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product._id} className="group relative flex flex-col rounded-xl bg-white border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <Link to={`/product/${product.slug}`} className="absolute inset-0 z-10" aria-label={`View ${product.name}`}></Link>
                                
                                <div className="relative aspect-square overflow-hidden bg-gray-100">
                                    {product.pricing.discount && (
                                        <Badge className="absolute top-3 left-3 z-20 bg-red-600 hover:bg-red-700">
                                            -{calculateDiscount(product.pricing.regular, product.pricing.discount)}%
                                        </Badge>
                                    )}
                                    <img
                                        src={product.images?.[0] || 'https://placehold.co/400x400?text=No+Image'}
                                        alt={product.name}
                                        className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                
                                <div className="p-4 flex-grow flex flex-col">
                                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.category?.name}</p>
                                    <h3 className="font-semibold text-gray-900 truncate mb-2 group-hover:text-[#f97316] transition-colors">{product.name}</h3>
                                    
                                    <div className="mt-auto flex items-end gap-2">
                                        <span className="text-xl font-bold text-[#f97316]">
                                            BDT {product.pricing.discount || product.pricing.regular}
                                        </span>
                                        {product.pricing.discount && (
                                            <span className="text-sm text-gray-400 line-through mb-1">
                                                BDT {product.pricing.regular}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="p-4 pt-0 z-20">
                                    <Button 
                                        className="w-full bg-[#f97316] hover:bg-[#ea6a10] text-white"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(product);
                                        }}
                                        disabled={isCartLoading}
                                    >
                                        {isCartLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShoppingCart className="mr-2 h-4 w-4" />}
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResultsPage;