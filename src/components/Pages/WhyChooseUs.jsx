import React from 'react';
import { Truck, ShieldCheck, Leaf, Headset } from 'lucide-react';

const features = [
    {
        icon: <Leaf className="w-10 h-10 text-green-600" />,
        title: "100% Organic Food",
        desc: "Certified organic products directly from farmers."
    },
    {
        icon: <Truck className="w-10 h-10 text-green-600" />,
        title: "Free Home Delivery",
        desc: "Free shipping on all orders over BDT 2000."
    },
    {
        icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
        title: "Secure Payment",
        desc: "100% secure payment with multiple gateways."
    },
    {
        icon: <Headset className="w-10 h-10 text-green-600" />,
        title: "24/7 Support",
        desc: "Dedicated support team for your assistance."
    }
];

const WhyChooseUs = () => {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 border rounded-2xl hover:shadow-lg hover:border-green-200 transition-all duration-300 group bg-green-50/30">
                            <div className="mb-4 p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-500">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;