import React, { createContext, useEffect, useState } from 'react';

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
    const storedAuthData = JSON.parse(window.localStorage.getItem('authData'));
    const [auth, setAuth] = useState({ loading: true, data: storedAuthData });

    const setAuthData = (data) => {
        setAuth({ loading: false, data: data });
    };

    useEffect(() => {
        if (storedAuthData && !auth.data.token) {
            setAuthData(storedAuthData);
        }
    }, []);


    useEffect(() => {
        window.localStorage.setItem('authData', JSON.stringify(auth.data));
    }, [auth.data]);

    return <authContext.Provider value={{ auth, setAuthData }}>{children}</authContext.Provider>;
};

export default AuthProvider;
