import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryShop = () => {
  const axiosPublic = useAxiosPublic();

  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['shop-categories'],
    queryFn: async () => {
      const res = await axiosPublic.get('/api/categories');
      return res.data;
    }
  });

  if (isLoading) {
      return (
        // Banner er same alignment: w-full max-w-[1400px] mx-auto px-4
        <div className="w-full max-w-[1400px] mx-auto px-4 py-8">
            <div className="flex overflow-x-auto justify-start gap-6 md:gap-8 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex-shrink-0 flex flex-col items-center gap-4 w-[140px]">
                        <Skeleton className="w-28 h-28 md:w-32 md:h-32 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                ))}
            </div>
        </div>
      );
  }

  if (error) return null; 

  return (
    // Banner er same alignment: w-full max-w-[1400px] mx-auto px-4
    <section className="w-full max-w-[1400px] mx-auto px-4 py-8 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      <div className="w-full">
        {/* Horizontal Scrollable Categories List */}
        <motion.div 
            layout
            className="flex overflow-x-auto justify-start gap-6 md:gap-8 pb-4 px-1 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
            <AnimatePresence>
                {categories.map((category, index) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }} 
                        key={category._id}
                        className="flex-shrink-0 flex justify-center snap-start"
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
      </div>
    </section>
  );
};

export default CategoryShop;