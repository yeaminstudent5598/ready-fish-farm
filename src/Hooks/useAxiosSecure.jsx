import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://server-side-ready-food-farm-ecru.vercel.app'
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('access-token');
            // console.log('Request sent to:', config.url); // অপশনাল: সব রিকোয়েস্ট দেখতে চাইলে এটা অন করুন
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosSecure.interceptors.response.use(
        (response) => response,
        async (error) => {
            const status = error?.response?.status;
            const url = error?.config?.url; // কোন URL এ সমস্যা হলো তা ধরবে

            // 🔍 ডিবাগিং লগ (কনসোল চেক করুন)
            if (status === 401 || status === 403) {
                // console.error(`🚨 LOGOUT TRIGGERED!`);
                // console.error(`❌ Failed URL: ${url}`);
                // console.error(`❌ Status Code: ${status}`);
                // console.error(`❌ Error Message:`, error.response?.data);
                
                await logOut();
                navigate('/login');
            }

            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;