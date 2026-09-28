import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [brandTheme, setBrandTheme] = useState("brand");
  const [accentColor, setAccentColor] = useState("blue");

  useEffect(() => {
    const savedTheme = Cookies.get("themeMode");
    const savedBrand = Cookies.get("brandTheme");
    const savedAccent = Cookies.get("accentColor");
    if (savedTheme) setTheme(savedTheme);
    if (savedBrand) setBrandTheme(savedBrand);
    if (savedAccent) setAccentColor(savedAccent);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    Cookies.set("themeMode", theme, { expires: 365 });
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-industry", brandTheme);
    Cookies.set("brandTheme", brandTheme, { expires: 365 });
  }, [brandTheme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accentColor);
    Cookies.set("accentColor", accentColor, { expires: 365 });
  }, [accentColor]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        brandTheme,
        setBrandTheme,
        accentColor,
        setAccentColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};