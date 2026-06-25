import React, { useEffect, useState } from 'react';
import AuthContext from '../Context/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(false)

    const googleProvider = new GoogleAuthProvider();
    


    const handleGoogle = ()=>{
        return signInWithPopup(auth,googleProvider);

    }

    const handleRegister =(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }


    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);



    const authInfo = {
        user,
        loading,
        handleGoogle,
        handleRegister

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;