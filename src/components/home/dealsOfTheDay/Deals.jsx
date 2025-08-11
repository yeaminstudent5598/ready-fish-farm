import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const API_URL = "http://localhost:9000/api/products";

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
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = Object.keys(timeLeft).map(interval => {
        if (!timeLeft[interval] && timeLeft[interval] !== 0) {
            return null;
        }
        return (
            <div key={interval} className="text-center">
                <span className="text-2xl font-bold">{String(timeLeft[interval]).padStart(2, '0')}</span>
                <span className="text-xs uppercase block">{interval}</span>
            </div>
        );
    });

    return (
        <div className="flex justify-center items-center gap-4 text-gray-800">
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
    );
};


const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsAndFilterDeals = async () => {
      try {
        const { data } = await axios.get(API_URL);
        const discountedProducts = data.filter(product => 
            product.pricing.discount && 
            product.pricing.discount < product.pricing.regular
        );
        setDeals(discountedProducts);
      } catch (err) {
        setError("Could not fetch deals. Please try again later.");
        console.error("Error fetching deals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndFilterDeals();
  }, []);

  const calculateDiscount = (regular, discount) => {
    if (!regular || !discount) return 0;
    return Math.round(((regular - discount) / regular) * 100);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading Deals...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }
  
  if (deals.length === 0) {
      return null; 
  }

  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-12">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Deals of the Day</h2>
                <p className="mt-4 text-lg text-gray-600">Grab these amazing offers before they're gone!</p>
            </div>
            <div className="mt-4 sm:mt-0">
                <CountdownTimer />
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {deals.slice(0, 8).map((product) => (
            <Link
              key={product._id}
              to={`/product/${product.slug}`}
              className="group block rounded-xl border bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative">
                {product.pricing.discount && (
                  <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    -{calculateDiscount(product.pricing.regular, product.pricing.discount)}%
                  </span>
                )}
                <div className="aspect-square w-full overflow-hidden">
                    <img
                        src={product.images?.[0] || 'https://placehold.co/600x600/EBF5FF/7A7A7A?text=No+Image'}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold mb-2 truncate group-hover:text-green-700">{product.name}</p>
                <div className="text-sm">
                  {product.pricing.discount && (
                    <div className="line-through text-gray-400">BDT {product.pricing.regular}</div>
                  )}
                  <div className="text-green-600 font-bold text-base">BDT {product.pricing.discount || product.pricing.regular}</div>
                </div>
              </div>
            </Link>
          ))}
          <div className='text-center mt-12'>
                <Link to="/deals">
                    <Button variant="outline" className="rounded-full px-8 py-6 text-base">
                        View All Deals <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
            </div>
        </div>

        {/* --- UPDATED LOGIC HERE --- */}
        {/* Show button if there are more deals than are currently visible */}
       
            
      
      </div>
    </div>
  );
};

export default Deals;
