import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useCart from '@/Hooks/useCart'; 

// ✅ সমস্যা সমাধান: আমরা এখন সব প্রোডাক্টের API ব্যবহার করছি যাতে হোমপেজে অন্তত প্রোডাক্ট দেখা যায়
// আগে '/api/products/deals' ছিল, যা ডিসকাউন্ট না থাকলে খালি অ্যারে দিত
const API_URL = "https://server-side-ready-food-farm-ecru.vercel.app/api/products"; 

const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date().setHours(24, 0, 0, 0) - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearTimeout(timer);
    });

    return (
        <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200 bg-red-100 dark:bg-gray-700 p-3 rounded-lg">
            {Object.keys(timeLeft).map(interval => (
                <div key={interval} className="text-center w-16">
                    <span className="text-3xl font-bold text-red-600 dark:text-red-400">{String(timeLeft[interval] || 0).padStart(2, '0')}</span>
                    <span className="text-xs uppercase block">{interval}</span>
                </div>
            ))}
        </div>
    );
};

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // useCart থেকে হুক
  const { addToCart, loading: isCartLoading } = useCart();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const { data } = await axios.get(API_URL);
        setDeals(data);
      } catch (err) {
        setError("Could not fetch products.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const calculateDiscount = (regular, discount) => {
    if (!regular || !discount) return 0;
    return Math.round(((regular - discount) / regular) * 100);
  };

  const handleAddToCart = (e, product) => {
      e.preventDefault();
      e.stopPropagation(); 
      addToCart(product); 
  };

  if (loading) return <div className="p-10 text-center flex justify-center"><Loader2 className="animate-spin text-red-600"/></div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  // ✅ সমস্যা সমাধান: এখানে return null বাদ দেওয়া হয়েছে।
  // যদি প্রোডাক্ট না থাকে, তবুও সেকশন দেখাবে।
  if (deals.length === 0) {
      return (
        <section className="bg-amber-50 dark:bg-gray-900 py-16 text-center">
             <h2 className="text-3xl font-bold text-gray-900">No Products Available</h2>
             <p className="text-gray-600 mt-2">Please check back later or add products from dashboard.</p>
        </section>
      );
  }

  return (
    <section className="bg-amber-50 dark:bg-gray-900 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
            <div className='flex-1'>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Deals of the Day</h2>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">Grab these amazing offers before they're gone!</p>
            </div>
            <div className="flex items-center gap-6">
                <CountdownTimer />
                <Link to="/deals" className="hidden lg:block">
                    <Button variant="outline" className="rounded-full px-6 py-5">
                        View All <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* ✅ আমরা প্রথম ৫টি প্রোডাক্ট দেখাচ্ছি */}
          {deals.slice(0, 5).map((product) => (
            <div key={product._id} className="group relative flex flex-col rounded-xl border bg-white dark:bg-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Link to={`/product/${product.slug}`} className="absolute inset-0 z-10" aria-label={`View ${product.name}`}></Link>
              
              <div className="relative">
                {/* ডিসকাউন্ট থাকলে দেখাবে, না থাকলে নেই */}
                {product.pricing?.discount && product.pricing?.discount < product.pricing?.regular && (
                    <span className="absolute top-3 left-3 z-20 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        -{calculateDiscount(product.pricing.regular, product.pricing.discount)}%
                    </span>
                )}
                
                <div className="aspect-square w-full overflow-hidden bg-gray-100">
                    <img
                        src={product.images?.[0] || 'https://placehold.co/400x400/EBF5FF/7A7A7A?text=No+Image'}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
              </div>
              
              <div className="p-4 flex-grow flex flex-col">
                <p className="text-sm text-gray-500 dark:text-gray-400">{product.category?.name || "General"}</p>
                <h3 className="mt-1 font-semibold text-gray-800 dark:text-white truncate group-hover:text-red-600">{product.name}</h3>
                <div className="mt-auto pt-2 text-sm">
                    {product.pricing?.discount ? (
                        <>
                            <p className="line-through text-gray-400">BDT {product.pricing.regular}</p>
                            <p className="text-red-600 dark:text-red-400 font-bold text-lg">BDT {product.pricing.discount}</p>
                        </>
                    ) : (
                        <p className="text-gray-900 dark:text-white font-bold text-lg">BDT {product.pricing?.regular}</p>
                    )}
                </div>
              </div>
              
              <div className="p-4 pt-0 z-20">
                <Button 
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={isCartLoading}
                >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deals;