import { createContext, useContext } from "react";

// কনটেক্সট এখানেই তৈরি এবং এক্সপোর্ট হবে, ডিফল্ট ভ্যালু null
export const CartContext = createContext(null);

// এই হুকটি অন্য যেকোনো কম্পোনেন্ট ব্যবহার করবে
const useCart = () => {
    const cart = useContext(CartContext);
    return cart;
};

export default useCart;