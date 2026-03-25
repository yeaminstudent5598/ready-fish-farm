import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Newsletter = () => {
    return (
        <section className="relative py-20 px-4 bg-green-600 overflow-hidden mt-16">
            {/* Background Pattern (Optional SVG) */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                 <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                 </svg>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Join Our Organic Family
                </h2>
                <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                    Subscribe to our newsletter to get updates about our latest products, 
                    organic farming tips, and exclusive offers delivered to your inbox.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto bg-white p-2 rounded-full shadow-2xl">
                    <input 
                        type="email" 
                        placeholder="Enter your email address..." 
                        className="flex-1 px-6 py-3 rounded-full outline-none text-gray-700 bg-transparent"
                    />
                    <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white px-8 h-12">
                        Subscribe <Send className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;