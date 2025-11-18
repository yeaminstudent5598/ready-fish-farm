// src/Hooks/useAxiosPublic.jsx

import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://server-side-ready-food-farm-ecru.vercel.app'
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
