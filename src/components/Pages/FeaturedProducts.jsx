import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

// নতুন Professional Transparent PNG প্রোডাক্টের ডামি ডাটা
const products = [
    { id: 1, name: "Organic Fresh Apple", category: "Fruits", price: 250, image: "https://freepngimg.com/thumb/apple/9-apple-png-image.png", rating: 4.8 },
    { id: 2, name: "Organic Red Tomato", category: "Vegetables", price: 80, image: "https://png.pngtree.com/png-clipart/20230113/ourmid/pngtree-red-fresh-tomato-with-green-leaf-png-image_6561484.png", rating: 5.0 },
    { id: 3, name: "Organic Orange", category: "Fruits", price: 220, image: "https://png.pngtree.com/png-vector/20231018/ourmid/pngtree-orange-slice-organic-png-image_10245123.png", rating: 4.7 },
    { id: 4, name: "Organic Carrots", category: "Vegetables", price: 120, image: "http://png.pngtree.com/png-vector/20241225/ourmid/pngtree-fresh-organic-carrots-in-a-neat-stack-png-image_14812590.png", rating: 4.5 },
    { id: 5, name: "Fresh Organic Broccoli", category: "Vegetables", price: 150, image: "https://png.pngtree.com/png-clipart/20250222/original/pngtree-fresh-organic-broccoli-in-woven-basket-png-image_20496530.png", rating: 4.9 },
    { id: 6, name: "Organic Strawberry", category: "Fruits", price: 400, image: "https://png.pngtree.com/png-vector/20250129/ourmid/pngtree-fresh-organic-strawberry-perfect-for-food-designs-png-image_15369026.png", rating: 4.6 },
    { id: 7, name: "Premium Organic Banana", category: "Fruits", price: 130, image: "https://png.pngtree.com/png-clipart/20250210/original/pngtree-organic-bananas-in-a-white-bowl-fresh-yellow-banana-bunch-ceramic-png-image_20414219.png", rating: 4.4 },
    { id: 8, name: "Organic Green Capsicum", category: "Vegetables", price: 160, image: "https://png.pngtree.com/png-vector/20241226/ourmid/pngtree-realistic-green-capsicum-vector-illustration-png-image_14903128.png", rating: 4.3 },
];

const categories = ["All", "Vegetables", "Fruits", "Snacks"];

const FeaturedProducts = () => {
    const [activeTab, setActiveTab] = useState("All");

    const filteredProducts = activeTab === "All" 
        ? products 
        : products.filter(p => p.category === activeTab);

    return (
        // Banner এবং CategoryShop এর সাথে হুবহু align করার জন্য w-full max-w-[1400px] দেওয়া হলো
        <section className="w-full max-w-[1400px] mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Daily Best Sells</h2>
                <div className="flex gap-4 mt-4 md:mt-0 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`text-sm font-semibold px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                                activeTab === cat 
                                ? 'bg-green-600 text-white shadow-lg' 
                                : 'text-gray-600 hover:text-green-600 bg-gray-100'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence>
                    {filteredProducts.map((product) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            key={product.id}
                            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-green-200 transition-all group bg-white relative flex flex-col"
                        >
                            {/* Badges */}
                            <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded z-20">Hot</span>

                            {/* Actions Overlay */}
                            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all z-20 translate-x-4 group-hover:translate-x-0">
                                <button className="bg-white p-2 rounded-full shadow hover:bg-green-600 hover:text-white transition-colors"><Heart size={16}/></button>
                                <button className="bg-white p-2 rounded-full shadow hover:bg-green-600 hover:text-white transition-colors"><Eye size={16}/></button>
                            </div>

                            {/* Image Container - True PNG Support with Drop Shadow for 3D effect */}
                            <div className="h-48 overflow-hidden bg-transparent p-6 relative flex items-center justify-center">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col flex-grow">
                                <span className="text-xs text-gray-400 mb-1">{product.category}</span>
                                <h3 className="font-bold text-gray-800 text-lg mb-1 truncate group-hover:text-green-600 cursor-pointer">{product.name}</h3>
                                
                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className={i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                                    ))}
                                    <span className="text-xs text-gray-400 ml-1">({product.rating})</span>
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                                    <div className="flex flex-col">
                                        <span className="text-green-600 font-bold text-xl">৳{product.price}</span>
                                        <span className="text-xs text-gray-400 line-through">৳{product.price + 50}</span>
                                    </div>
                                    <Button size="sm" className="bg-green-100 text-green-700 hover:bg-green-600 hover:text-white rounded-full transition-all">
                                        Add <ShoppingCart size={16} className="ml-1"/>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default FeaturedProducts;