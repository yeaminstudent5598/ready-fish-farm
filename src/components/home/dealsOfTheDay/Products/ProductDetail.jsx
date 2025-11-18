import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import useCart from '@/Hooks/useCart';
import { useWishlist } from '@/components/Providers/WishlistProvider';

// UI Components
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
    ShoppingCart, 
    Heart, 
    Star, 
    Truck, 
    ShieldCheck, 
    RefreshCw, 
    Share2, 
    ArrowRight,
    Loader2
} from 'lucide-react';

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const axiosPublic = useAxiosPublic();
    const { addToCart, loading: isCartLoading } = useCart();
    const { addToWishlist, loading: isWishlistLoading } = useWishlist();

    // প্রোডাক্ট ডেটা ফেচ করা
    useEffect(() => {
        const fetchProductDetails = async () => {
            window.scrollTo(0, 0);
            try {
                setLoading(true);
                const res = await axiosPublic.get(`/api/products/${slug}`);
                setProduct(res.data);

                // ক্যাটাগরি অনুযায়ী রিলেটেড প্রোডাক্ট আনা
                if (res.data?.category?._id) {
                    const relatedRes = await axiosPublic.get(`/api/products/category/${res.data.category._id}?exclude=${res.data._id}&limit=4`);
                    setRelatedProducts(relatedRes.data);
                }
            } catch (err) {
                setError("Product not found or an error occurred.");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchProductDetails();
        }
    }, [slug, axiosPublic]);

    // ডিসকাউন্ট ক্যালকুলেশন
    const calculateDiscount = (regular, discount) => {
        if (!regular || !discount) return 0;
        return Math.round(((regular - discount) / regular) * 100);
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="h-10 w-10 animate-spin text-red-600" /></div>;
    if (error) return <div className="text-center p-10 text-red-500 font-semibold">{error}</div>;
    if (!product) return null;

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Breadcrumb Navigation */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
                    <Link to="/" className="hover:text-red-600">Home</Link> / 
                    <span className="mx-1">Shop</span> / 
                    <span className="mx-1 font-medium text-gray-800">{product.name}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* Main Product Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Left: Product Image */}
                    <div className="flex flex-col items-center">
                        <div className="w-full aspect-square bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border border-gray-200 relative group">
                            {product.pricing.discount && (
                                <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm z-10">
                                    -{calculateDiscount(product.pricing.regular, product.pricing.discount)}% OFF
                                </Badge>
                            )}
                            <img 
                                src={product.images?.[0]} 
                                alt={product.name} 
                                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col">
                        {/* Title & Rating */}
                        <div className="mb-4">
                            <Badge variant="outline" className="text-red-600 border-red-200 mb-3 uppercase tracking-wider text-xs">
                                {product.category?.name}
                            </Badge>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">{product.name}</h1>
                            
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex text-yellow-400 text-sm">
                                    {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-4 h-4" />)}
                                </div>
                                <span className="text-sm text-gray-500">(No reviews yet)</span>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="mb-6">
                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-extrabold text-red-600">
                                    BDT {product.pricing.discount || product.pricing.regular}
                                </span>
                                {product.pricing.discount && (
                                    <span className="text-xl text-gray-400 line-through mb-1">
                                        BDT {product.pricing.regular}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-green-600 font-medium mt-1">In Stock & Ready to Ship</p>
                        </div>

                        <Separator className="my-6" />

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Button 
                                size="lg" 
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white h-14 text-lg shadow-md shadow-red-100"
                                onClick={() => addToCart(product)}
                                disabled={isCartLoading}
                            >
                                {isCartLoading ? <Loader2 className="animate-spin mr-2" /> : <ShoppingCart className="mr-2 h-5 w-5" />}
                                Add to Cart
                            </Button>
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="flex-1 h-14 text-lg border-gray-300 hover:border-red-500 hover:text-red-600"
                                onClick={() => addToWishlist(product)}
                                disabled={isWishlistLoading}
                            >
                                {isWishlistLoading ? <Loader2 className="animate-spin mr-2" /> : <Heart className="mr-2 h-5 w-5" />}
                                Add to Wishlist
                            </Button>
                        </div>

                        {/* Features / Trust Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <Truck className="text-red-500 h-6 w-6" />
                                <div>
                                    <p className="text-sm font-bold text-gray-800">Fast Delivery</p>
                                    <p className="text-xs text-gray-500">Within 2-3 Days</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <ShieldCheck className="text-red-500 h-6 w-6" />
                                <div>
                                    <p className="text-sm font-bold text-gray-800">Authentic</p>
                                    <p className="text-xs text-gray-500">100% Organic</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <RefreshCw className="text-red-500 h-6 w-6" />
                                <div>
                                    <p className="text-sm font-bold text-gray-800">Easy Return</p>
                                    <p className="text-xs text-gray-500">7 Days Policy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-10">
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 max-w-md mb-8 bg-gray-100 p-1 rounded-lg">
                            <TabsTrigger value="description" className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm font-medium">Description</TabsTrigger>
                            <TabsTrigger value="specification" className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm font-medium">Specification</TabsTrigger>
                            <TabsTrigger value="warranty" className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-sm font-medium">Warranty</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="description" className="animate-in fade-in-50 duration-300">
                            <div 
                                className="prose max-w-none text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: product.details?.description || "<p>No description available for this product.</p>" }}
                            />
                        </TabsContent>
                        <TabsContent value="specification" className="animate-in fade-in-50 duration-300">
                             <div 
                                className="prose max-w-none text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: product.details?.specification || "<p>No specifications available.</p>" }}
                            />
                        </TabsContent>
                        <TabsContent value="warranty" className="animate-in fade-in-50 duration-300">
                             <div 
                                className="prose max-w-none text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: product.details?.warranty || "<p>No warranty information available.</p>" }}
                            />
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Similar Products</h2>
                            <Link to={`/category/${product.category.slug}`} className="text-red-600 font-medium hover:underline flex items-center gap-1">
                                View More <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(relatedProd => (
                                <Link 
                                    to={`/product/${relatedProd.slug}`} 
                                    key={relatedProd._id}
                                    className="group block bg-white rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
                                >
                                    <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                                        {relatedProd.pricing.discount && (
                                            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                                                -{calculateDiscount(relatedProd.pricing.regular, relatedProd.pricing.discount)}%
                                            </span>
                                        )}
                                        <img
                                            src={relatedProd.images?.[0]}
                                            alt={relatedProd.name}
                                            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {/* Quick Add Button (Visible on Hover) */}
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addToCart(relatedProd);
                                            }}
                                            className="absolute bottom-3 right-3 bg-white text-red-600 p-2 rounded-full shadow-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:text-white"
                                            title="Add to Cart"
                                        >
                                            <ShoppingCart className="h-5 w-5" />
                                        </button>
                                    </div>
                                    
                                    <div className="p-4">
                                        <p className="text-xs text-gray-500 mb-1">{relatedProd.category?.name}</p>
                                        <h3 className="font-semibold text-gray-900 truncate group-hover:text-red-600 transition-colors">{relatedProd.name}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <p className="text-red-600 font-bold">BDT {relatedProd.pricing.discount || relatedProd.pricing.regular}</p>
                                            {relatedProd.pricing.discount && (
                                                <p className="text-xs text-gray-400 line-through">BDT {relatedProd.pricing.regular}</p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProductDetail;