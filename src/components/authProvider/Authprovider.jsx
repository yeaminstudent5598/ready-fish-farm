import React, { useEffect, useState } from 'react';
import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile, 
    GoogleAuthProvider, 
    signInWithPopup 
} from 'firebase/auth';
import { app } from '../firebase/Firebase';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import { AuthContext } from '@/Hooks/useAuth'; 

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log("👤 Auth State Changed:", currentUser?.email);

            if (currentUser) {
                // ইউজার পাওয়া গেছে, এখন টোকেন আনতে হবে
                const userInfo = { email: currentUser.email };
                
                axiosPublic.post('/jwt', userInfo)
                    .then((res) => {
                        if (res.data.token) {
                            // ১. আগে টোকেন সেভ করুন
                            localStorage.setItem('access-token', res.data.token);
                            // console.log("✅ Token Saved for:", currentUser.email);
                            
                            // ২. তারপর ইউজার সেট করুন (যাতে অন্য কম্পোনেন্টরা টোকেন পায়)
                            setUser(currentUser);
                        } else {
                            // টোকেন না আসলে ফোর্স লগআউট
                            // console.error("⚠️ No token received!");
                            localStorage.removeItem('access-token');
                            setUser(null);
                        }
                        setLoading(false);
                    })
                    .catch((error) => {
                        // console.error("❌ JWT Error:", error);
                        localStorage.removeItem('access-token');
                        setUser(null);
                        setLoading(false);
                    });
            } else {
                // ইউজার লগআউট করলে টোকেন মুছে ফেলা
                localStorage.removeItem('access-token');
                setUser(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [axiosPublic]);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;    