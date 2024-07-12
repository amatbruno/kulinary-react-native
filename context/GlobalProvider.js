import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, getAccount } from '../lib/appwrite';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const currentAccount = await getAccount();
            if (currentAccount) {
                const currentUser = await getCurrentUser();
                setIsLoggedIn(true);
                setUser(currentUser);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        } catch (err) {
            throw err;
            setIsLoggedIn(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
                fetchUser
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
