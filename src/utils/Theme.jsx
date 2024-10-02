import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Theme = () => {
  const [theme, setTheme] = useState({
    background: true,
    logoBg: true,
    textColor: false,
    logoTextColor: true,
  });

  // CSS Variable value for theme
  const updateCSSVariable = (variable, value) => {
    document.documentElement.style.setProperty(variable, value);
  };

  const setBackground = (value) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      background: value,
    }));
    updateCSSVariable("--bg-color", value ? "#fff" : "#000000");
  };

  const setLogoBg = (value) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      logoBg: value,
    }));
    updateCSSVariable("--logo-color", value ? "#2b33ff" : "#fff");
  };

  const setTextColor = (value) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      textColor: value,
    }));
    updateCSSVariable("--text-color", value ? "#fff" : "#000000");
  };

  const setLogoTextColor = (value) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      logoTextColor: value,
    }));
    updateCSSVariable("--logo-text-color", value ? "#fff" : "#2b33ff");
  };

  const handleTheme = () => {
    setBackground(!theme.background);
    setTextColor(!theme.textColor);
    setLogoBg(!theme.logoBg);
    setLogoTextColor(!theme.logoTextColor);
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
