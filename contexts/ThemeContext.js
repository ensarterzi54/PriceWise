import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null)

const ThemeContextProvider = ({ children }) => {
    const [systemTheme, setSystemTheme] = useState(null);
    
    useEffect(() => {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

        if(localStorage.getItem("theme")) {
            let check = localStorage.getItem("theme")
            let mode = check === "true";
            setSystemTheme(mode)
        } else {
            setSystemTheme(isDarkMode)
            localStorage.setItem("theme", isDarkMode)
        }

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