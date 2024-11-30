import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null)

const ThemeContextProvider = ({ children }) => {
    const [systemTheme, setSystemTheme] = useState(null);
    useEffect(() => {
        console.log("systemTheme context içinde: ", systemTheme)
    }, [systemTheme]);
    
    useEffect(() => {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        setSystemTheme(isDarkMode)
        console.log("c systemTheme: ", systemTheme)
    }, []);

    return (
        <ThemeContext.Provider value={{
            systemTheme,
            setSystemTheme
        }}>
            { children }
        </ThemeContext.Provider>
    );
}

export default ThemeContextProvider