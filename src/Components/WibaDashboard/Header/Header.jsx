import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { FaSearch, FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [theme, setTheme] = useState({
    background: true,
    logoBg: true,
    textColor: false,
    logoTextColor: true,
  });

  const handleHeaderMenuToggle = (menuName) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  // Handles closing the submenu when mouse leaves the wrapper
  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

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

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      name: "Categories",
      subItems: [
        { label: "UTME Quiz", link: "/categories/utme" },
        { label: "GST/GNS Practice Questions", link: "/categories/gst" },
        { label: "BIO 101 Plant & Animal Aspect", link: "/categories/biology" },
        { label: "CHM 101 Practice Questions", link: "/categories/chemistry" },
        { label: "MAT 101", link: "/categories/mat101" },
        { label: "MAT 103", link: "/categories/mat103" },
        { label: "PHY 101 Practice Questions", link: "/categories/phy101" },
      ],
    },
    {
      name: "Study Guide",
    },
    {
      name: "PDF Materials",
      subItems: [
        { label: "MAT 101", link: "/categories/mat101pdf" },
        { label: "MAT 103", link: "/categories/mat103pdf" },
        { label: "BIO 101", link: "/categories/bio101pdf" },
        { label: "CHM 101", link: "/categories/chm101pdf" },
        { label: "PHY 101", link: "/categories/phy101pdf" },
      ],
    },
    {
      name: "UTME Past Questions",
      subItems: [
        { label: "English", link: "/categories/englishUTME" },
        { label: "Math", link: "/categories/mathUTME" },
        { label: "Physics", link: "/categories/physicsUTME" },
        { label: "Chemistry", link: "/categories/chemistryUTME" },
      ],
    },
  ];

  return (
    <section className="header-wrapper">
      <div className={`inner-h ${isOpen ? "menu-open" : ""}`}>
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="" />
          </Link>
        </div>
        <div className="inner-one">
          <nav>
            <ul className="menu">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="menu-items-wrapper"
                  onMouseEnter={() => handleHeaderMenuToggle(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link className="custom-links">{item.name}</Link>
                  {activeMenu === item.name && item.subItems && (
                    <ul className="sub-menu slideIn">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="sub-menu-items">
                          <Link to={subItem.link} className="custom-links">
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="inner-two">
          <FaSearch
            size={15}
            style={{
              color: theme ? "var(--text-color)" : "var(--bg-color)",
            }}
            className="search-icon"
          />
          <input type="text" placeholder="Search for anything" />
        </div>
        <div className="login-signup">
          <button className="btn1">
            <Link to="/login" className="link">
              Log in
            </Link>
          </button>

          <button className="btn2">
            <Link to="/signup" className="link2">
              Sign up
            </Link>
          </button>
        </div>
        <div onClick={handleTheme} className="icon-div">
          {theme.background ? (
            <FaMoon size={19} className="theme-icon" />
          ) : (
            <FaSun size={20} className="theme-icon" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
