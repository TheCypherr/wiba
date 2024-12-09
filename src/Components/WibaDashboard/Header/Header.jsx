import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import searchData2 from "../../../utils/searchData2";
import {
  FaSearch,
  FaSun,
  FaMoon,
  FaTimes,
  FaBars,
  FaChevronRight,
  FaSignOutAlt,
  FaChevronUp,
  FaChevronDown,
  FaGraduationCap,
  FaBook,
  FaTrophy,
  FaTwitter,
  FaInstagram,
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
    // Clear the search query and suggestions
    setQuery("");
    setSuggestions([]);
    // toggleSearch();

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

  // State for search is open and search text suggestion
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Function to handle search popups
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      const filteredSuggestions = searchData2.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // click function to handle search open
  const toggleSearch = () => {
    setSearch(!search);
  };

  // click function to close search bar onClick of any search result
  const closeSearchBar = () => {
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

  const mobileMenuItems = [
    {
      name: "JAMB CBT",
      link: "/login",
      icon: <FaGraduationCap size={27} />,
    },
    {
      name: "A Level Test",
      link: "/login",
      icon: <FaGraduationCap size={27} />,
    },
    {
      name: "100L Quiz",
      link: "/login",
      icon: <FaGraduationCap size={27} />,
    },
    {
      name: "Leader Board",
      link: "/login",
      icon: <FaTrophy size={23} />,
    },
    {
      name: "PDF Materials",
      link: "/login",
      icon: <FaBook size={23} />,
    },
    {
      name: "UTME Past Questions",
      icon: <FaBook size={23} />,
      link: "/login",
    },
  ];

  const menuItems = [
    {
      name: "Categories",
      subItems: [
        { label: "JAMB CBT", link: "/login" },
        { label: "A Level Test", link: "/login" },
        { label: "100L Quiz", link: "/login" },
      ],
      link: "/login",
    },
    {
      name: "PDF Materials",
      link: "/login",
    },
    {
      name: "UTME Past Questions",
      link: "/login",
    },
    {
      name: "Leader Board",
      link: "/login",
    },
  ];

  return (
    <section className="header-wrapper">
      <div className={`inner-h ${isOpen ? "menu-open" : ""}`}>
        <div className="logo" onClick={handlePageReload}></div>

        {!search && (
          <>
            <div
              onClick={() => {
                toggleMenu();
                closeSearchBar();
              }}
              className={`icon-menu ${isOpen ? "menu-open-icon" : ""}`}
            >
              {isOpen ? (
                <FaTimes size={25} className="fa-times" />
              ) : (
                <FaBars size={25} />
              )}
            </div>

            <div className="logo-new" onClick={handlePageReload}></div>
          </>
        )}

        <div className="search-container">
          {!search ? (
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
          ) : (
            <div className="search-overlay">
              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder="Search for anything..."
                  value={query}
                  onChange={handleSearch}
                />
                <FaTimes
                  size={20}
                  className="close-search-icon"
                  onClick={toggleSearch}
                />

                {suggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        onClick={() => {
                          handlePageLoading(suggestion.link);
                          toggleSearch();
                        }}
                        className="suggestion-item"
                      >
                        {suggestion.title}
                      </li>
                    ))}
                  </ul>
                )}
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

            <div className="main-inner-one-new">
              <nav>
                <ul className="main-menu-new">
                  {mobileMenuItems.map((item, index) => (
                    <li key={index} className="main-menu-items-wrapper-new">
                      <div className="main-arrow-new">
                        <Link
                          className="main-custom-links-new"
                          to="#"
                          onClick={() => {
                            handlePageLoading(item.link);
                            closeSideBar();
                          }}
                        >
                          <p>{item.icon}</p>
                          <p>{item.name}</p>
                        </Link>
                      </div>
                      {activeMenu === item.name && item.subItems && (
                        <ul className="main-sub-menu-new slideIn">
                          {item.subItems.map((subItem, subIndex) => (
                            <li
                              key={subIndex}
                              className="main-sub-menu-items-new"
                            >
                              <Link
                                to="#"
                                onClick={() => {
                                  handlePageLoading(subItem.link);
                                  closeSideBar();
                                }}
                                className="main-custom-links-new"
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

            <div className="social-media">
              <div className="social-icon">
                <a
                  href="https://twitter.com/wiba_learn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter color="gray" />
                </a>
                <a
                  href="https://instagram.com/wiba_learn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram color="gray" />
                </a>
              </div>
              <div className="social-text">@wiba_learn</div>
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
                    <div className="flex-ul">
                      <Link
                        className="main-custom-links"
                        to="#"
                        onClick={() => handlePageLoading(item.link)}
                      >
                        {item.name}
                      </Link>
                      {item.name !== "Leader Board" &&
                        item.name !== "PDF Materials" &&
                        item.name !== "UTME Past Questions" &&
                        (activeMenu === item.name ? (
                          <FaChevronUp
                            className="chevron-icon"
                            onClick={() => handleHeaderMenuToggle(item.name)}
                          />
                        ) : (
                          <FaChevronDown
                            className="chevron-icon"
                            onClick={() => handleHeaderMenuToggle(item.name)}
                          />
                        ))}
                    </div>
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
            <input
              type="text"
              placeholder="Search for anything"
              value={query}
              onChange={handleSearch}
            />

            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    onClick={() => handlePageLoading(suggestion.link)}
                    className="suggestion-item"
                  >
                    {suggestion.title}
                  </li>
                ))}
              </ul>
            )}
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
        </div>
      </div>

      {loading && (
        <div className="load-overlay">
          <div className="load-slide">
            <div className="load-bar"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Header;
