import "firebase/app";
import { createContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

import React, { useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const [user, setUser] = useState({});

    const history = useHistory();
    const auth = getAuth();

    useEffect(() => {
        localStorage.setItem('isUserConnected', 0);
        console.log('user State in Storage : ', localStorage.getItem('isUserConnected'));
    }, []);

    useEffect(() => {
        if (isConnected){
            console.log('user is connected.. Redirection to home')
            history.push('/home');
        }
    }, [isConnected]);

    useEffect(() => {
        onAuthStateChanged(auth, (_user) => {
            if (_user){
                console.log("[in AuthContext] - Connected User >>>> ", _user);
                setUser(_user);
                localStorage.setItem('isUserConnected', 'yes');
                setLoading(false);
                setIsConnected(true);
            }
        });
    }, [user, history]);

    const value = { user, isConnected };

    return (
        <AuthContext.Provider value = { value }>
            {children}
        </AuthContext.Provider>
    )
}