import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
    const error = useRouteError();
    
    // এরর স্ট্যাটাস বা মেসেজ চেক করা
    const status = error?.status || 404;
    const message = error?.statusText || error?.message || "Something went wrong.";

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
            {/* আইকন এবং অ্যানিমেশন */}
            <div className="mb-6 relative">
                <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
                <div className="relative bg-white p-6 rounded-full shadow-lg border-2 border-red-100">
                    <AlertTriangle className="h-16 w-16 text-red-500" />
                </div>
            </div>

            {/* টেক্সট সেকশন */}
            <h1 className="text-6xl font-extrabold text-gray-900 mb-2">{status}</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {status === 404 ? "Oops! Page Not Found" : "Unexpected Error"}
            </h2>
            <p className="text-gray-600 max-w-md mb-8">
                {status === 404 
                    ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable." 
                    : message}
            </p>

            {/* অ্যাকশন বাটন */}
            <Link to="/">
                <Button className="bg-[#f97316] hover:bg-[#ea6a10] px-8 py-6 text-lg flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Back to Home
                </Button>
            </Link>
        </div>
    );
};

export default ErrorPage;