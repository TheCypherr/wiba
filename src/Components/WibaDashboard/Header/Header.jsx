import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaSun,
  FaMoon,
  FaTimes,
  FaBars,
  FaChevronRight,
} from "react-icons/fa";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [theme, setTheme] = useState({
    background: true,
    logoBg: true,
    textColor: false,
    logoTextColor: true,
  });
  const navigate = useNavigate();

  const handlePageReload = () => {
    window.scrollTo(0, 0);
    window.location.href = "/";
  };

  // State for loading
  const [loading, setLoading] = useState(false);

  const handlePageLoading = (targetPage) => {
    setLoading(true); // start the loading

    // simulate the loading time
    setTimeout(() => {
      setLoading(false); // stop loading after timeout
      navigate(targetPage); // navigate to target page
    }, 2000); // come back to adjust timer oooo
  };

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

  // useState for dropdown menu
  const [isOpen, setIsOpen] = useState(false);

  // onClick function to handle dropdown menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // onClick function to close menubar onclick of menu items
  const closeSideBar = () => {
    setIsOpen(false);
  };

  // useEffect to prevent scrolling when menubar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // State for search is open
  const [search, setSearch] = useState(false);

  // click function to handle search open
  const toggleSearch = () => {
    setSearch(!search);
  };

  // click function to close search bar onClick of any search result
  const closeSearch = () => {
    setSearch(false);
  };

  // useEffect to prevent scrolling when search bar is open
  useEffect(() => {
    if (search) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [search]);

  const menuItems = [
    {
      name: "Categories",
      subItems: [
        { label: "UTME Quiz", link: "/categories/utme" },
        { label: "GST/GNS Quiz", link: "/categories/gst" },
        { label: "BIO 101 Quiz", link: "/categories/biology" },
        { label: "CHM 101 Quiz", link: "/categories/chemistry" },
        { label: "MAT 101 Quiz", link: "/categories/mat101" },
        { label: "MAT 103 Quiz", link: "/categories/mat103" },
        { label: "PHY 101 Quiz", link: "/categories/phy101" },
      ],
    },
    {
      name: "Study Guide",
      link: "/categories/studyGuide",
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
          <Link onClick={handlePageReload}>
            <img src="/logo.png" alt="" />
          </Link>
        </div>

        <div
          onClick={toggleMenu}
          className={`icon-menu ${isOpen ? "menu-open-icon" : ""}`}
        >
          {isOpen ? (
            <FaTimes size={25} className="fa-times" />
          ) : (
            <FaBars size={25} />
          )}
        </div>

        <div className="logo-new">
          <Link onClick={handlePageReload}>
            <img src="/logo.png" alt="" />
          </Link>
        </div>

        <div className="search-container">
          <div
            className={`search-div ${search ? "search-is-open" : ""}`}
            onClick={toggleSearch}
          >
            {search ? (
              <FaTimes
                size={20}
                style={{
                  color: theme ? "var(--text-color)" : "var(--bg-color)",
                }}
              />
            ) : (
              <FaSearch
                size={20}
                style={{
                  color: theme ? "var(--text-color)" : "var(--bg-color)",
                }}
              />
            )}
          </div>

          {search && (
            <div className="search-overlay">
              <div className="search-wrapper">
                <input type="text" placeholder="Search for anything..." />
              </div>
            </div>
          )}
        </div>

        {isOpen && <div className="back-drop"></div>}
        {isOpen && (
          <div className="inner-h-new slideIn">
            <div className="login-signup">
              <button className="btn1">
                <Link
                  to="#"
                  onClick={() => {
                    handlePageLoading("/login");
                    closeSideBar();
                  }}
                  className="link"
                >
                  Log in
                </Link>
              </button>

              <button className="btn2">
                <Link
                  to="#"
                  onClick={() => {
                    handlePageLoading("/signup");
                    closeSideBar();
                  }}
                  className="link2"
                >
                  Sign up
                </Link>
              </button>
            </div>

            <div className="inner-one-new">
              <nav>
                <ul className="menu-new">
                  {menuItems.map((item, index) => (
                    <li
                      key={index}
                      className="menu-items-wrapper-new"
                      onMouseEnter={() => handleHeaderMenuToggle(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="arrow-new">
                        <Link
                          className="custom-links-new"
                          to="#"
                          onClick={() => {
                            handlePageLoading(item.link);
                            closeSideBar();
                          }}
                        >
                          {item.name}
                        </Link>
                        <FaChevronRight />
                      </div>
                      {activeMenu === item.name && item.subItems && (
                        <ul className="sub-menu-new slideIn">
                          {item.subItems.map((subItem, subIndex) => (
                            <li key={subIndex} className="sub-menu-items-new">
                              <Link
                                to="#"
                                onClick={() => {
                                  handlePageLoading(subItem.link);
                                  closeSideBar();
                                }}
                                className="custom-links-new"
                              >
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

            <div onClick={handleTheme} className="icon-div-new">
              <p>Switch Theme</p>
              {theme.background ? (
                <FaMoon size={15} className="theme-icon-new" />
              ) : (
                <FaSun size={16} className="theme-icon-new" />
              )}
            </div>
          </div>
        )}

        <div className="inner-h-old">
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
                    <Link
                      className="custom-links"
                      to="#"
                      onClick={() => handlePageLoading(item.link)}
                    >
                      {item.name}
                    </Link>
                    {activeMenu === item.name && item.subItems && (
                      <ul className="sub-menu slideIn">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex} className="sub-menu-items">
                            <Link
                              to="#"
                              onClick={() => handlePageLoading(subItem.link)}
                              className="custom-links"
                            >
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
              <Link
                to="#"
                onClick={() => handlePageLoading("/login")}
                className="link"
              >
                Log in
              </Link>
            </button>

            <button className="btn2">
              <Link
                to="#"
                onClick={() => handlePageLoading("/signup")}
                className="link2"
              >
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
      </div>

      {loading && (
        <div className="load-slide">
          <div className="load-bar"></div>
        </div>
      )}
    </section>
  );
};

export default Header;
