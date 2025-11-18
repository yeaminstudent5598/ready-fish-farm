import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import useCart from '@/Hooks/useCart';
import { ShoppingCart, Loader2, ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CategoryProductsPage = () => {
    const { slug } = useParams(); // URL থেকে slug নেওয়া (যেমন: fish-and-seafood)
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const axiosPublic = useAxiosPublic();
    const { addToCart, loading: isCartLoading } = useCart();

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                // আমাদের নতুন API কল করা
                const res = await axiosPublic.get(`/api/products/category-by-slug/${slug}`);
                setProducts(res.data.products);
                setCategoryName(res.data.categoryName);
            } catch (err) {
                console.error(err);
                setError("Category not found or no products available.");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchCategoryProducts();
        }
    }, [slug, axiosPublic]);

    // ডিসকাউন্ট ক্যালকুলেশন
    const calculateDiscount = (regular, discount) => {
        if (!regular || !discount) return 0;
        return Math.round(((regular - discount) / regular) * 100);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-[60vh]"><Loader2 className="h-10 w-10 animate-spin text-[#f97316]" /></div>;
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
                <Link to="/"><Button>Go Back Home</Button></Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 mt-18 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Category</p>
                        <h1 className="text-3xl font-bold text-gray-800">{categoryName}</h1>
                        <p className="text-gray-600 mt-1">{products.length} items found</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                       {/* এখানে ভবিষ্যতে ফিল্টার অপশন যোগ করতে পারেন */}
                       <Button variant="outline" className="flex gap-2">
                            <Filter className="w-4 h-4" /> Filter
                       </Button>
                    </div>
                </div>

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <p className="text-xl text-gray-500">No products found in this category yet.</p>
                        <Link to="/">
                            <Button className="mt-4 bg-[#f97316] hover:bg-[#ea6a10]">Browse Other Items</Button>
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
                                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{categoryName}</p>
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

export default CategoryProductsPage;