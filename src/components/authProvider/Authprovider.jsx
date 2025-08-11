import { createUserWithEmailAndPassword,   getAuth,   GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/Firebase';
import useAxiosPublic from '../../Hooks/useAxiosPublic';


export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {

     const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);

    }
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Get token and store token
                const userInfo = { email: currentUser.email };
                axiosPublic
                    .post('/jwt', userInfo)
                    .then((res) => {
                      
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching JWT token:", error);
                    });
            } else {
                // Remove the token and logout
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });
    
        return () => {
            unsubscribe();
        };
    }, [axiosPublic]); // Dependency on axiosPublic
    

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;