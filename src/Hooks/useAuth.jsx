import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;