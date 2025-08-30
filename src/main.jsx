import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import router from './components/routers/router.jsx';

// TanStack Query imports
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

// QueryClient এর একটি নতুন ইন্সট্যান্স তৈরি করা হয়েছে
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* এখানে শুধু QueryClientProvider এবং RouterProvider থাকবে */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);