import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Theme = () => {
  const defaultTheme = {
    background: true,
    logoBg: true,
    textColor: false,
    logoTextColor: true,
    logoImage: "/logo.png",
  };

  const [theme, setTheme] = useState(defaultTheme);

  // CSS Variable value for theme
  const updateCSSVariable = (variable, value) => {
    document.documentElement.style.setProperty(variable, value);
  };

  const setBackground = (value) => {
    updateCSSVariable("--bg-color", value ? "#000000" : "#fff");
  };

  const setLogoBg = (value) => {
    updateCSSVariable("--logo-color", value ? "#fff" : "#2b33ff");
  };

  const setTextColor = (value) => {
    updateCSSVariable("--text-color", value ? "#000000" : "#fff");
  };

  const setLogoTextColor = (value) => {
    updateCSSVariable("--logo-text-color", value ? "#2b33ff" : "#fff");
  };

  const setLogoImage = (value) => {
    updateCSSVariable(
      "--logo-image",
      value ? "url('/logo2.png')" : "url('/logo.png')"
    );
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
      setLogoImage(savedTheme.background);
    }
  }, []);

  const handleTheme = () => {
    const newTheme = {
      background: !theme.background,
      logoBg: !theme.logoBg,
      textColor: !theme.textColor,
      logoTextColor: !theme.logoTextColor,
      logoImage: theme.background ? "/logo.png" : "/logo2.png",
    };

    setTheme(newTheme);

    // Update localStorage
    localStorage.setItem("theme", JSON.stringify(newTheme));

    // Apply the updated theme to CSS variables
    setBackground(newTheme.background);
    setLogoBg(newTheme.logoBg);
    setTextColor(newTheme.textColor);
    setLogoTextColor(newTheme.logoTextColor);
    setLogoImage(newTheme.background);
  };

  return (
    <div onClick={handleTheme} className="main-icon-div">
      {theme.background ? (
        <FaSun size={19} className="main-theme-icon" />
      ) : (
        <FaMoon size={20} className="main-theme-icon" />
      )}
    </div>
  );
};

export default Theme;
