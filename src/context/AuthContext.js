import React, { useContext } from 'react';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const setLoggedIn = () => {
        localStorage.setItem('isLoggedIn', true);
    };

    const getIsLoggedIn = () => {
        return localStorage.getItem('isLoggedIn');
    };

    return <AuthContext.Provider value={{ getIsLoggedIn, setLoggedIn }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};