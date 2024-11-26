import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Theme = () => {
  const defaultTheme = {
    background: true,
    logoBg: true,
    textColor: false,
    logoTextColor: true,
  };

  const [theme, setTheme] = useState(defaultTheme);

  // CSS Variable value for theme
  const updateCSSVariable = (variable, value) => {
    document.documentElement.style.setProperty(variable, value);
  };

  const setBackground = (value) => {
    updateCSSVariable("--bg-color", value ? "#fff" : "#000000");
  };

  const setLogoBg = (value) => {
    updateCSSVariable("--logo-color", value ? "#2b33ff" : "#fff");
  };

  const setTextColor = (value) => {
    updateCSSVariable("--text-color", value ? "#fff" : "#000000");
  };

  const setLogoTextColor = (value) => {
    updateCSSVariable("--logo-text-color", value ? "#fff" : "#2b33ff");
  };

  // Load saved theme from localStorage or use default
  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem("theme"));
    if (savedTheme) {
      setTheme(savedTheme);

      // Apply saved theme CSS variables
      setBackground(savedTheme.background);
      setLogoBg(savedTheme.logoBg);
      setTextColor(savedTheme.textColor);
      setLogoTextColor(savedTheme.logoTextColor);
    }
  }, []);

  const handleTheme = () => {
    const newTheme = {
      background: !theme.background,
      logoBg: !theme.logoBg,
      textColor: !theme.textColor,
      logoTextColor: !theme.logoTextColor,
    };

    setTheme(newTheme);

    // Update localStorage
    localStorage.setItem("theme", JSON.stringify(newTheme));

    // Apply the updated theme to CSS variables
    setBackground(newTheme.background);
    setLogoBg(newTheme.logoBg);
    setTextColor(newTheme.textColor);
    setLogoTextColor(newTheme.logoTextColor);
  };

  return (
    <div onClick={handleTheme} className="main-icon-div">
      {theme.background ? (
        <FaMoon size={19} className="main-theme-icon" />
      ) : (
        <FaSun size={20} className="main-theme-icon" />
      )}
    </div>
  );
};

export default Theme;
