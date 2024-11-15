import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaBook,
  FaCloudUploadAlt,
  FaBars,
  FaTimes,
  FaSearch,
  FaGraduationCap,
  FaHome,
} from "react-icons/fa";
import { useFirebaseUser } from "../../../utils/FirebaseContext";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../config/Firebase";
import { auth } from "../../../config/Firebase";
import { signOut } from "firebase/auth";

const UserProfile = () => {
  const { user } = useFirebaseUser();
  const [activeMenu, setActiveMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [theme, setTheme] = useState({
    background: true,
    logoBg: true,
    textColor: false,
    logoTextColor: true,
  });
  const [data, setData] = useState({});

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };
  console.log(data);

  const handleAdd = async (e) => {
    e.preventDefault();

    // Create a new object that combines existing data with label2 values
    const dataWithLabels = { ...data };

    userProfileData.forEach((input) => {
      // Only add label2 value for fields where label2 exists
      if (input.label2 !== undefined) {
        dataWithLabels[input.id] = input.label2; // directly assign label2 value
      } else {
        dataWithLabels[input.id] = data[input.id] || ""; // Keep the original data for fields without label2
      }
    });

    try {
      await setDoc(doc(db, "User Profiles", user.uid), {
        ...dataWithLabels,
        timeStamp: serverTimestamp(),
      });
      console.log("User profile saved successfully!");
    } catch (err) {
      console.log(err, "error fetching data");
    }
  };

  const handlePageReload = () => {
    window.scrollTo(0, 0);
    window.location.href = "/main";
  };

  const handlePageLoading = (targetPage) => {
    setLoading(true); // start the loading

    // simulate the loading time
    setTimeout(() => {
      setLoading(false); // stop loading after timeout
      navigate(targetPage); // navigate to target page
    }, 2000); // come back to adjust timer oooo
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

  const handleHeaderMenuToggle = (menuName) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
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

  const menuItems = [
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
      link: "/aLevel",
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
      name: "UTME Past Questions",
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

  const userProfileData = [
    {
      id: "username",
      label: "Username",
      label2: user ? user.displayName : "",
    },
    {
      id: "fullName",
      label: "Name & Surname",
      type: "text",
      placeholder: "Oluwa Cypher",
    },
    {
      id: "email",
      label: "Email",
      label2: user ? user.email : "",
    },
    {
      id: "phone",
      label: "Phone",
      type: "text",
      placeholder: "+234 701 2208 069",
    },
    {
      id: "country",
      label: "Country",
      label2: "Nigeria",
    },
  ];

  return (
    <section className="user-profile">
      <div className="inner-profile1">
        <div className="profile-logo">
          <Link onClick={handlePageReload}>
            <img src="/logo.png" alt="" />
          </Link>
        </div>

        <nav>
          <ul className="profile-menu">
            <li className="each-menu">
              <Link
                to="#"
                onClick={() => {
                  handlePageLoading("/main");
                }}
                className="profile-custom-links"
              >
                <FaHome size={22} /> Dashboard
              </Link>
            </li>
            <li className="each-menu">
              <Link
                to="#"
                onClick={() => {
                  handlePageLoading("/categories/JambCBT");
                }}
                className="profile-custom-links"
              >
                <FaGraduationCap size={25} /> UTME Quiz
              </Link>
            </li>
            <li className="each-menu">
              <Link
                to="#"
                onClick={() => {
                  handlePageLoading("/categories/A-Level");
                }}
                className="profile-custom-links"
              >
                <FaGraduationCap size={25} /> A Level Test
              </Link>
            </li>
            <li className="each-menu">
              <Link
                to="#"
                onClick={() => {
                  handlePageLoading("/categories/allquiz");
                }}
                className="profile-custom-links"
              >
                <FaGraduationCap size={25} /> 100L Quiz
              </Link>
            </li>
            <li className="each-menu">
              <Link
                to="#"
                onClick={() => {
                  handlePageLoading("/categories/allquiz");
                }}
                className="profile-custom-links"
              >
                <FaBook size={20} /> Study Guide
              </Link>
            </li>
            <li className="each-menu">
              <Link
                to="#"
                onClick={() => {
                  handlePageLoading("/categories/allquiz");
                }}
                className="profile-custom-links"
              >
                <FaBook size={20} /> PDF Materials
              </Link>
            </li>
            <li className="each-menu">
              <Link
                to="#"
                onClick={() => {
                  handlePageLoading("/categories/allquiz");
                }}
                className="profile-custom-links"
              >
                <FaBook size={20} /> UTME Past Questions
              </Link>
            </li>
          </ul>
        </nav>

        <div
          className="profile-logout"
          onClick={() => {
            handleLogout();
          }}
        >
          <FaSignOutAlt size={20} color="red" />
          <p>Logout</p>
        </div>
      </div>

      <div className="inner-profile2">
        <div className="top-profile">
          <p>User Profile</p>
          <button className="profile-btn">Overview</button>
        </div>
        <div className="bottom-profile">
          <div className="left-profile">
            <div className="profile-pic">
              <img
                src={file ? URL.createObjectURL(file) : "/nooo.jpg"}
                alt="profile"
              />
            </div>

            <div className="hide1">
              <label htmlFor="file" style={{ fontSize: "1.1rem" }}>
                Image: <FaCloudUploadAlt className="profile-icon" />
              </label>
              <input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="right-profile">
            <form className="form-container" onSubmit={handleAdd}>
              <div className="form-input hide2">
                <label htmlFor="file" style={{ fontSize: "1rem" }}>
                  Image: <FaCloudUploadAlt className="profile-icon" />
                </label>
                <input
                  id="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  //   style={{ display: "none" }}
                />
              </div>

              {userProfileData.map((input) => (
                <div className="form-input" key={input.id}>
                  <label style={{ fontSize: "1rem" }}>
                    {input.label}: {input.label2}
                  </label>
                  {input.type && (
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInput}
                    />
                  )}
                </div>
              ))}

              <button className="profile-btn" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className={`main-inner-h ${isOpen ? "main-menu-open" : ""}`}>
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
                <input type="text" placeholder="Search for anything..." />
                <FaTimes
                  size={20}
                  className="close-search-icon"
                  onClick={toggleSearch}
                />
              </div>
            </div>
          )}
        </div>

        {isOpen && <div className="main-back-drop"></div>}
        {isOpen && (
          <div className="main-inner-h-new slideIn">
            <div className="profile-logo">
              <Link onClick={handlePageReload}>
                <img src="/logo.png" alt="" />
              </Link>
            </div>
            <div className="underline"></div>

            <div className="main-inner-one-new">
              <nav>
                <ul className="main-menu-new">
                  {menuItems.map((item, index) => (
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
      </div>

      {loading && (
        <div className="load-slide">
          <div className="load-bar"></div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;

// INITIAL WAY

// Add a new document in collection "User Profiles" (use addDoc instead of setDoc as it is much better to let cloud Firestore autogenerate and ID for you)... so instead of this below,

// const handleAdd = async (e) => {
//   e.preventDefault();

//   try {
//     await setDoc(doc(db, "User Profiles", user.uid), {
//       ...data,
//       timeStamp: serverTimestamp(),
//     });
//     console.log("User profile saved successfully!");
//   } catch (err) {
//     console.log(err, "error fetching data");
//   }

// we use this below
// Add a new document with a generated ID
// try {
//   await addDoc(collection(db, "User Profiles"), {
//     name: "Los Angeles",
//     state: "CA",
//     country: "USA",
//     timeStamp: serverTimestamp(),
//   });
// } catch (err) {
//   console.log(err, "Unable to upload");
// }
// };
