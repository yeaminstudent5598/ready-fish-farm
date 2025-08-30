import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useWishlist } from '@/components/Providers/WishlistProvider';
import useCart from '@/Hooks/useCart';

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { addToCart, loading: isCartLoading } = useCart();
    const { addToWishlist, loading: isWishlistLoading } = useWishlist();

    useEffect(() => {
        const fetchProductDetails = async (productSlug) => {
            window.scrollTo(0, 0);
            try {
                setLoading(true);
                const res = await axiosPublic.get(`/api/products/${productSlug}`);
                setProduct(res.data);

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
            fetchProductDetails(slug);
        }
    }, [slug, axiosPublic]);

    const handleAddToCart = () => {
        if (product) addToCart(product);
    };

    const handleAddToWishlist = () => {
        if (product) addToWishlist(product);
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    if (!product) return null;

    return (
        <div className="bg-gray-50 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 lg:p-10">
                    {/* Image Section */}
                    <div className="md:w-full">
                        <img 
                            src={product.images?.[0]} 
                            alt={product.name} 
                            className="w-full h-auto aspect-square object-contain rounded-lg border bg-gray-50 dark:bg-gray-800"
                        />
                    </div>

                    {/* Info Section */}
                    <div className="md:w-full flex flex-col">
                        <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">{product.category?.name}</p>
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">{product.name}</h1>
                        <div className="mt-4 flex items-baseline gap-3">
                            {product.pricing.discount && (
                                <p className="line-through text-gray-500 text-xl">BDT {product.pricing.regular}</p>
                            )}
                            <p className="text-red-600 dark:text-red-400 font-bold text-4xl">BDT {product.pricing.discount || product.pricing.regular}</p>
                        </div>
                        <div className="my-6 border-t border-gray-200 dark:border-gray-700"></div>
                        
                        <Accordion type="single" collapsible defaultValue="description" className="w-full">
                            <AccordionItem value="description">
                                <AccordionTrigger className="text-lg font-semibold">Description</AccordionTrigger>
                                <AccordionContent>
                                    <div 
                                        className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                                        dangerouslySetInnerHTML={{ __html: product.details?.description || "No description available." }}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="specification">
                                <AccordionTrigger className="text-lg font-semibold">Specification</AccordionTrigger>
                                <AccordionContent>
                                     <div 
                                        className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                                        dangerouslySetInnerHTML={{ __html: product.details?.specification || "No specification available." }}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="warranty">
                                <AccordionTrigger className="text-lg font-semibold">Warranty Policy</AccordionTrigger>
                                <AccordionContent>
                                     <div 
                                        className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                                        dangerouslySetInnerHTML={{ __html: product.details?.warranty || "No warranty information available." }}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        
                        <div className="mt-auto pt-8 flex gap-4">
                            <Button 
                                size="lg" 
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-6 text-lg"
                                onClick={handleAddToCart}
                                disabled={isCartLoading}
                            >
                                <ShoppingCart className="mr-2 h-5 w-5" /> 
                                {isCartLoading ? 'Adding...' : 'Add to Cart'}
                            </Button>
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="flex-1 py-6 text-lg"
                                onClick={handleAddToWishlist}
                                disabled={isWishlistLoading}
                            >
                                <Star className="mr-2 h-5 w-5" /> 
                                {isWishlistLoading ? 'Adding...' : 'Add to Wishlist'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">You Might Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(relatedProd => (
                                <Link 
                                    to={`/product/${relatedProd.slug}`} 
                                    key={relatedProd._id}
                                    className="group block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                                        <img
                                            src={relatedProd.images?.[0]}
                                            alt={relatedProd.name}
                                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-800 dark:text-white truncate">{relatedProd.name}</h3>
                                        <p className="text-red-600 dark:text-red-400 font-bold text-lg mt-2">BDT {relatedProd.pricing.discount || relatedProd.pricing.regular}</p>
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