import React from 'react';
import { Button } from '@/components/ui/button';

const OrganicBanner = () => {
    return (
        <section className="relative h-[400px] md:h-[500px] bg-fixed bg-cover bg-center flex items-center justify-center my-16" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop')" }}>
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 text-center max-w-3xl px-4 text-white space-y-6">
                <span className="text-green-400 font-script text-2xl md:text-3xl italic">Organic & Healthy</span>
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                    Bring Nature Into Your Home
                </h2>
                <p className="text-lg text-gray-200">
                    We believe in providing the freshest, chemical-free organic food directly from local farmers to your kitchen table.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg">
                        Shop Now
                    </Button>
                    <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-green-800 rounded-full px-8 py-6 text-lg">
                        Read Our Story
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default OrganicBanner;