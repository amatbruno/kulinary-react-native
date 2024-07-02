import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme } from '../themes/themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const colorScheme = Appearance.getColorScheme();
    const [theme, setTheme] = useState(colorScheme === 'dark' ? darkTheme : lightTheme);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
    };

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
        });
        return () => subscription.remove();
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
