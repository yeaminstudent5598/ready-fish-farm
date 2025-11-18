import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';

const CategoryShop = () => {
  const axiosPublic = useAxiosPublic();
  const [showAll, setShowAll] = useState(false);

  // প্রাথমিক অবস্থায় কয়টি ক্যাটাগরি দেখাবে (ডেস্কটপে ১২টি, মোবাইলে ৬টি হলে ভালো হয়)
  const INITIAL_LIMIT = 12; 

  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['shop-categories'],
    queryFn: async () => {
      const res = await axiosPublic.get('/api/categories');
      // শুধুমাত্র যেসব ক্যাটাগরি ন্যাভবারে আছে অথবা সব ক্যাটাগরি (আপনার ইচ্ছা অনুযায়ী)
      // এখানে সব ক্যাটাগরি আনা হচ্ছে
      return res.data;
    }
  });

  // কোন ক্যাটাগরিগুলো রেন্ডার হবে
  const displayedCategories = showAll ? categories : categories.slice(0, INITIAL_LIMIT);

  if (isLoading) {
      return (
        <div className="px-4 py-16 max-w-7xl mx-auto">
            <div className="flex justify-center mb-10"><Skeleton className="h-10 w-64 rounded-full" /></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                        <Skeleton className="w-[120px] h-[120px] rounded-full" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                ))}
            </div>
        </div>
      );
  }

  if (error) return null; // এরর হলে সেকশন হাইড থাকবে

  return (
    <section className="px-4 py-16 bg-white relative overflow-hidden">
      {/* Background Decor (Optional) */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
                <Layers className="text-[#f97316] h-8 w-8" />
                Shop by Category
            </h2>
            <p className="text-gray-500">Find everything you need in one place</p>
            <div className="w-24 h-1 bg-[#f97316] mx-auto rounded-full mt-4"></div>
        </div>

        {/* Categories Grid with Animation */}
        <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 justify-items-center"
        >
            <AnimatePresence>
                {displayedCategories.map((category, index) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }} // Staggered animation
                        key={category._id}
                        className="w-full flex justify-center"
                    >
                        <Link
                            to={`/category/${category.slug}`}
                            className="group flex flex-col items-center gap-4 w-[140px]"
                        >
                            {/* Image Container */}
                            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full p-1 border-2 border-dashed border-gray-200 group-hover:border-[#f97316] transition-all duration-500">
                                <div className="w-full h-full rounded-full overflow-hidden bg-gray-50 relative z-10 shadow-sm group-hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                                    <img
                                        src={category.image || `https://placehold.co/200x200/FFF7ED/F97316?text=${category.name.charAt(0)}`}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => { e.target.src = "https://placehold.co/200x200/f3f4f6/9ca3af?text=IMG"; }}
                                    />
                                </div>
                                {/* Ping Animation Effect on Hover */}
                                <span className="absolute top-0 left-0 w-full h-full rounded-full bg-[#f97316] opacity-0 group-hover:animate-ping group-hover:opacity-10 transition-all"></span>
                            </div>
                            
                            {/* Category Name */}
                            <p className="text-center font-semibold text-gray-700 text-sm md:text-base group-hover:text-[#f97316] transition-colors duration-300 line-clamp-2">
                                {category.name}
                            </p>
                        </Link>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        {categories.length > INITIAL_LIMIT && (
            <div className="flex justify-center mt-12">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setShowAll(!showAll)}
                    className="group border-gray-300 text-gray-600 hover:text-[#f97316] hover:border-[#f97316] hover:bg-orange-50 px-8 rounded-full transition-all duration-300"
                >
                    {showAll ? (
                        <>Show Less <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" /></>
                    ) : (
                        <>View All Categories <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" /></>
                    )}
                </Button>
            </div>
        )}
      </div>
    </section>
  );
};

export default CategoryShop;