import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");


    useEffect(() => {
        const savedTheme = Cookies.get("themeMode")
        if (savedTheme) {
            setTheme(savedTheme)
        }
    }, [])

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        Cookies.set("themeMode", theme, { expires: 365 })
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"))
    }


    return (
        <ThemeContext.Provider
            value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
