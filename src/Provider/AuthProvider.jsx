import React, { useState } from 'react';
import AuthContext from '../Context/AuthContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(false)

    const googleProvider = new GoogleAuthProvider();
    


    const handleGoogle = ()=>{
        return signInWithPopup(auth,googleProvider);

    }



    const authInfo = {
        user,
        loading,
        handleGoogle

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;