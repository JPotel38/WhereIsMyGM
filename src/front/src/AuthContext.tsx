import React, {createContext, ReactNode, useEffect, useState} from 'react';

export interface AuthContextType {
    auth: any;
    setAuthData: (data: any) => void;
}

export const authContext = createContext<AuthContextType>({
    auth: undefined, setAuthData(data: any): void {
    }
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const storedAuthData = window.localStorage.getItem('authData');
    const parsedAuthData = storedAuthData ? JSON.parse(storedAuthData) : null;
    console.log(parsedAuthData)
    const [auth, setAuth] = useState({ loading: true, data: parsedAuthData });

    const setAuthData = (data: any ) => {
        setAuth({ loading: false, data: data });
    };

    useEffect(() => {
        if (parsedAuthData && !auth.data.token) {
            setAuthData(parsedAuthData);
        }
    }, []);


    useEffect(() => {
        window.localStorage.setItem('authData', JSON.stringify(auth.data));
    }, [auth.data]);

    return <authContext.Provider value={{ auth, setAuthData }}>{children}</authContext.Provider>;
};

export default AuthProvider;
