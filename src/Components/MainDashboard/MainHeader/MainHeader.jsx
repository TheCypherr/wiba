import React, { useEffect, useState } from "react";
import "./MainHeader.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaSun,
  FaMoon,
  FaTimes,
  FaBars,
  FaChevronRight,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaHome,
  FaGraduationCap,
  FaBook,
} from "react-icons/fa";
import { auth } from "../../../config/Firebase";
import { signOut } from "firebase/auth";
import { useFirebaseUser } from "../../../utils/FirebaseContext";
import EmailAvatar from "../../../emailAvatar";
import searchData from "../../../utils/searchData1";

const MainHeader = () => {
  const { user } = useFirebaseUser();
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
    window.location.href = "/main";
  };

  // Firebase logout with loadingstate and timer
  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 2000);
    } catch (error) {
      setLoading(false);
    }
  };

  // State for loading
  const [loading, setLoading] = useState(false);

  const handlePageLoading = (targetPage) => {
    setLoading(true); // start the loading
    // Clear the search query and suggestions
    setQuery("");
    setSuggestions([]);
    toggleSearch();

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
      const filteredSuggestions = searchData.filter((item) =>
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
    // {
    //   name: "Categories",
    //   link: "/categories/JambCBT",
    //   subItems: [
    //     { label: "UTME Quiz", link: "/categories/JambCBT" },
    //     { label: "A Level Test", link: "/aLevel" },
    //     { label: "100L Quiz", link: "/categories/allquiz" },
    //   ],
    // },
    {
      name: "Dashboard",
      link: "/main",
      icon: <FaHome size={25} />,
    },
    {
      name: "JAMB CBT",
      link: "/categories/JambCBT",
      icon: <FaGraduationCap size={27} />,
    },
    {
      name: "A Level Test",
      link: "/coming-soon",
      icon: <FaGraduationCap size={27} />,
    },
    {
      name: "100L Quiz",
      link: "/categories/allquiz",
      icon: <FaGraduationCap size={27} />,
    },
    {
      name: "Study Guide",
      link: "/categories/studyGuide",
      icon: <FaBook size={23} />,
    },
    {
      name: "PDF Materials",
      link: "/categories/pdf-materials",
      icon: <FaBook size={23} />,
    },
    {
      name: "JAMB Past Questions",
      icon: <FaBook size={23} />,
      link: "/categories/past-questions",
      // subItems: [
      //   { label: "English", link: "/past-question/english" },
      //   { label: "Math", link: "/past-question/math" },
      //   { label: "Physics", link: "/past-question/physics" },
      //   { label: "Chemistry", link: "/past-question/chemistry" },
      // ],
    },
  ];

  const menuItems = [
    {
      name: "Categories",
      subItems: [
        { label: "JAMB CBT", link: "/categories/JambCBT" },
        { label: "A Level Test", link: "/coming-soon" },
        { label: "100L Quiz", link: "/categories/allquiz" },
      ],
      link: "/categories/JambCBT",
    },
    {
      name: "Study Guide",
      link: "/categories/studyGuide",
    },
    {
      name: "PDF Materials",
      link: "/categories/pdf-materials",
    },
    {
      name: "JAMB Past Questions",
      link: "/categories/past-questions",
    },
  ];

  return (
    <section className="main-header-wrapper">
      <div className={`main-inner-h ${isOpen ? "main-menu-open" : ""}`}>
        <div className="main-logo">
          <Link onClick={handlePageReload}>
            <img src="/logo.png" alt="" />
          </Link>
        </div>

        {!search && (
          <>
            <div
              onClick={() => {
                toggleMenu();
                closeSearchBar();
              }}
              className={`main-icon-menu ${
                isOpen ? "main-menu-open-icon" : ""
              }`}
            >
              {isOpen ? (
                <FaTimes size={25} className="main-fa-times" />
              ) : (
                <FaBars size={25} />
              )}
            </div>

            <div className="main-logo-new">
              <Link onClick={handlePageReload}>
                <img src="/logo.png" alt="" />
              </Link>
            </div>
          </>
        )}

        <div className="main-search-container">
          {!search ? (
            <div
              className={`main-search-div ${
                search ? "main-search-is-open" : ""
              }`}
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
            <div className="main-search-overlay">
              <div className="main-search-wrapper">
                <input
                  type="text"
                  value={query}
                  onChange={handleSearch}
                  placeholder="Search for anything..."
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
                        onClick={() => handlePageLoading(suggestion.link)}
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

        {isOpen && <div className="main-back-drop"></div>}
        {isOpen && (
          <div className="main-inner-h-new slideIn">
            <div className="active-user-profile">
              <Link
                className="active-user-link"
                to="#"
                onClick={() => {
                  handlePageLoading("/profile");
                  closeSideBar();
                }}
              >
                <div className="user-profile-picture">
                  <EmailAvatar
                    email={user?.email || "guest@example.com"}
                    size={50}
                    fontSize={20}
                  />
                  <div className="active-status" />
                </div>
                <div className="user-profile-text">
                  <span className="span11">
                    {user ? `${user.displayName.split(" ")[0]}` : ""}
                  </span>
                  {/* <span className="span11">
                    {user ? `${user.displayName.split(" ").slice(-1)[0]}` : ""}
                  </span> */}
                  <span className="span22">Student</span>
                </div>
              </Link>
            </div>
            <div className="underline"></div>

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

            <div
              className="logout-btn"
              onClick={() => {
                handleLogout();
                closeSideBar();
              }}
            >
              <FaSignOutAlt color="red" size={22} />
              <p>Logout</p>
            </div>
          </div>
        )}

        <div className="main-inner-h-old">
          <div className="last-side1">
            <div className="main-inner-one">
              <nav>
                <ul className="main-menu">
                  {menuItems.map((item, index) => (
                    <li
                      key={index}
                      className="main-menu-items-wrapper"
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
                        {item.name !== "Study Guide" &&
                          item.name !== "PDF Materials" &&
                          item.name !== "JAMB Past Questions" &&
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
                        <ul className="main-sub-menu slideIn">
                          {item.subItems.map((subItem, subIndex) => (
                            <li key={subIndex} className="main-sub-menu-items">
                              <Link
                                to="#"
                                onClick={() => handlePageLoading(subItem.link)}
                                className="main-custom-links"
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
            <div className="main-inner-two">
              <FaSearch
                size={15}
                style={{
                  color: theme ? "var(--text-color)" : "var(--bg-color)",
                }}
                className="main-search-icon"
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
          </div>

          <div className="last-side2">
            <div>
              <Link
                className="profile"
                onClick={() => handlePageLoading("/profile")}
              >
                {/* <FaUser to="#" /> */}
                <div className="user-profile-picture0">
                  <EmailAvatar
                    email={user?.email || "guest@example.com"}
                    size={35}
                    fontSize={15}
                  />
                  <div className="active-status" />
                </div>
                {/* <p>Profile</p> */}
              </Link>
            </div>

            <Link
              className="logout"
              onClick={() => {
                handleLogout();
                closeSideBar();
              }}
            >
              Logout
              <FaSignOutAlt size={14} />
            </Link>
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

export default MainHeader;
