import React from 'react';
import { Button } from '@/components/ui/button'; 
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PromoBanner = () => {
    return (
        // Banner এবং CategoryShop এর সাথে হুবহু align করার জন্য max-w-[1400px] দেওয়া হলো
        <section className="w-full max-w-[1400px] mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Banner 1 */}
                <div className="relative overflow-hidden rounded-2xl h-[250px] md:h-[300px] group">
                    <img 
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop" 
                        alt="Fresh Vegetables" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-8">
                        <span className="text-green-400 font-bold text-sm uppercase tracking-wider mb-2">Fresh Harvest</span>
                        <h3 className="text-3xl font-bold text-white mb-4">Organic <br/> Vegetables</h3>
                        <p className="text-gray-200 mb-6 text-sm">Get 20% off on your first order</p>
                        <Link to="/category/fresh-vegetables">
                             <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full">
                                Shop Now <ArrowRight className="ml-2 h-4 w-4"/>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Banner 2 */}
                <div className="relative overflow-hidden rounded-2xl h-[250px] md:h-[300px] group">
                    <img 
                        src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop" 
                        alt="Fresh Fruits" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-8">
                        <span className="text-orange-400 font-bold text-sm uppercase tracking-wider mb-2">Summer Sale</span>
                        <h3 className="text-3xl font-bold text-white mb-4">Fresh & Juicy <br/> Fruits</h3>
                        <p className="text-gray-200 mb-6 text-sm">Limited time offer only</p>
                        <Link to="/category/fresh-fruits">
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full">
                                Shop Now <ArrowRight className="ml-2 h-4 w-4"/>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromoBanner;