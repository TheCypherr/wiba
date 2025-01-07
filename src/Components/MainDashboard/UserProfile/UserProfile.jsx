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
  FaEdit,
  FaCheck,
  FaTrophy,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { useFirebaseUser } from "../../../utils/FirebaseContext";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../config/Firebase";
import { auth } from "../../../config/Firebase";
import { signOut } from "firebase/auth";
import EmailAvatar from "../../../emailAvatar";
import searchData from "../../../utils/searchData1";

const UserProfile = () => {
  const { user } = useFirebaseUser();
  const [activeMenu, setActiveMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [theme, setTheme] = useState({
    background: true,
    logoBg: true,
    textColor: false,
    logoTextColor: true,
  });
  const [userPaymentData, setUserPaymentData] = useState({
    customerFullName: "",
    customerEmail: "",
    customerPhone: "",
  });
  const [isEditing, setIsEditing] = useState({});
  const [data, setData] = useState({});
  const [incomplete, setIncomplete] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  // const [paymentFailed, setPaymentFailed] = useState(false);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const dataWithLabels = { ...data };

    // Check for incomplete fields
    const isIncomplete = userProfileData.some(
      (input) => !dataWithLabels[input.id] && !input.readOnly
    );
    setLoading(true);

    userProfileData.forEach((input) => {
      if (input.label2 !== undefined) {
        dataWithLabels[input.id] = input.label2;
      } else {
        dataWithLabels[input.id] = data[input.id] || "";
      }
    });

    if (isIncomplete) {
      setTimeout(() => {
        setIncomplete(true);
        setLoading(false);

        setTimeout(() => {
          setIncomplete(false);
        }, 2000);
      }, 2000);

      return; // Prevent saving if fields are incomplete
    }

    try {
      setLoading(true);
      await setDoc(doc(db, "userProfiles", user.userId), {
        ...dataWithLabels,
        timeStamp: serverTimestamp(),
      });
      setLoading(false);
      setSuccess(true);
      setIsEditing({}); // Remove editing mode for all fields
      fetchUserPaymentData(); // fetch user payment data immediately after profile is updated

      setTimeout(() => {
        setSuccess(false);
        fetchUserProfile(); // Fetch updated data after saving
      }, 2000);
    } catch (err) {
      console.log(err, "error fetching data");
    }
  };

  const fetchUserProfile = async () => {
    if (!user) return;
    try {
      const docRef = doc(db, "userProfiles", user.userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setData(userData);
      } else {
        console.log("No updated user profile found");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (user && user.userId) {
      fetchUserProfile(); // Fetch data on initial render
    }
  }, [user]);

  const toggleEdit = (id) => {
    if (
      !userProfileData.find((input) => input.id === id)?.readOnly &&
      !success
    ) {
      setIsEditing((prev) => ({
        ...prev,
        [id]: !prev[id], // Toggle the editing state
      }));
    }
  };

  // Fetching completed user profile from firestore for monify
  const fetchUserPaymentData = async () => {
    if (!user) return;
    try {
      const docRef = doc(db, "userProfiles", user.userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("Fetched user data:", userData); /// console to see fetched data details
        setUserPaymentData({
          customerFullName: userData.fullName || "Unknown Name",
          customerEmail: userData.email || "",
          customerPhone: userData.phone || "",
        });
      } else {
        console.log("No user profile found");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserPaymentData(); // Fetch user profile data when `user` is available or changes
    }
  }, [user]); // This dependency ensures the effect runs when the `user` changes

  // Payment failed for monnify
  const handlePayNow = () => {
    // Check for incomplete fields (same logic from handleAdd)
    const isIncomplete = userProfileData.some(
      (input) => !data[input.id] && !input.readOnly
    );
    setLoading(true);

    if (isIncomplete) {
      setTimeout(() => {
        setIncomplete(true);
        setLoading(false);

        setTimeout(() => {
          setIncomplete(false);
        }, 2000);
      }, 2000);

      return; // Prevent saving if fields are incomplete
    }

    // Proceed with payment flow
    if (paymentCompleted) {
      console.log("User already paid. No further action.");
      setLoading(false);
      return; // Disable further actions
    }

    if (!window.MonnifySDK) {
      console.log("Monnify SDK is not loaded");
      handleCloseWithoutPay();
    } else {
      console.log("Monnify SDK is loaded");
      payWithMonnify();
    }
  };

  // Initialize Monnify SDK
  const payWithMonnify = () => {
    setLoading(true); // Show loading state

    if (!window.MonnifySDK) {
      setIncomplete(true);
      return;
    }

    const reference = "WibA" + Math.floor(Math.random() * 1000000000 + 1);
    const apiKey = import.meta.env.VITE_MONNIFY_API_KEY;
    const contractCode = import.meta.env.VITE_MONNIFY_CONTRACT_CODE;
    // const isTestMode = process.env.NODE_ENV !== "production"; // Use true for non-production

    window.MonnifySDK.initialize({
      amount: 2000,
      currency: "NGN",
      reference,
      customerFullName: userPaymentData.customerFullName,
      customerEmail: userPaymentData.customerEmail,
      customerPhone: userPaymentData.customerPhone,
      apiKey,
      contractCode,
      paymentDescription: "WibA one-time Payment",
      // isTestMode: false, // change back to true for test mode
      metadata: {
        name: userPaymentData.customerFullName.split(" ")[0],
        email: userPaymentData.customerEmail,
      },
      onComplete: (response) => {
        handlePaymentCompletion(response);
      },
      onClose: (data) => {
        if (data.paymentStatus === "Failed") {
          handleFailedPaymentClose(); // Handle failed payment
        } else if (data.paymentStatus === "Completed") {
          handleOnClose(data); // Handle successful payment
        } else {
          console.log("Payment status:", data);
          handleCloseWithoutPay();
        }
      },
      onError: (e) => {
        // Custom error handling here
        if (e && e.reason) {
          console.log("Error:", e.reason);

          // If customer email is invalid, show the custom failure UI
          if (e.reason === "Customer email not provided or invalid") {
            handleFailedPaymentClose(); // Trigger UI state for failed payment
          }
        }
      },
    });
  };

  // Separate async function for handling payment completion
  const handlePaymentCompletion = async (response) => {
    console.log("Payment Completed", response);

    if (!handlePaymentCompletion) {
      console.log("Payment Failed", response);

      handleFailedPaymentClose();
    }

    try {
      await setDoc(
        doc(db, "userProfiles", user.userId),
        {
          ...userPaymentData, // Existing user data
          paymentStatus: "Paid",
          paymentDate: new Date().toISOString(),
          reference: response.transactionReference,
        },
        { merge: true }
      );

      setPaymentCompleted(true); // Update local state
      handlePageLoading("/payment-success"); // Navigate after updating
    } catch (error) {
      console.error("Error saving payment status:", error);
      handleFailedPaymentClose();
    }
  };

  // User closing on successful payment
  const handleOnClose = async (data) => {
    console.log("Payment Completed", data);

    try {
      await setDoc(
        doc(db, "userProfiles", user.userId),
        {
          ...userPaymentData, // Existing user data
          paymentStatus: "Paid",
          paymentDate: new Date().toISOString(),
          reference: data.transactionReference,
        },
        { merge: true }
      );

      setPaymentCompleted(true); // Update local state
      handlePageLoading("/payment-success"); // Navigate after updating
    } catch (error) {
      console.error("Error saving payment status:", error);
    }
  };

  // userClosing without proceeding with payment
  const handleCloseWithoutPay = () => {
    navigate("/profile"); // Navigate to profile page
    setLoading(false);
  };

  // User closing on failed payment
  const handleFailedPaymentClose = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setTryAgain(true);
      navigate("/profile"); // Navigate to profile page

      setTimeout(() => {
        setTryAgain(false);
      }, 2000);
    }, 1000);
  };

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const docRef = doc(db, "userProfiles", user.userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.paymentStatus === "Paid") {
            setPaymentCompleted(true); // Sync state with Firestore
          }
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
      }
    };

    if (user) {
      checkPaymentStatus();
    }
  }, [user]);

  const handlePageReload = () => {
    window.scrollTo(0, 0);
    window.location.href = "/main";
  };

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

  const menuItems = [
    // {
    //   name: "Categories",
    //   link: "/categories/JambCBT",
    //   subItems: [
    //     { label: "UTME Quiz", link: "/categories/JambCBT" },
    //     { label: "Post-UTME Test", link: "/aLevel" },
    //     { label: "100L Quiz", link: "/categories/allquiz" },
    //   ],
    // },
    {
      name: "Dashboard",
      link: "/main",
      icon: <FaHome size={22} />,
    },
    {
      name: "JAMB CBT",
      link: "/categories/JambCBT",
      icon: <FaGraduationCap size={22} />,
    },
    {
      name: "Post-UTME Test",
      link: "/categories/post-utme",
      icon: <FaGraduationCap size={22} />,
    },
    {
      name: "100L Quiz",
      link: "/categories/allquiz",
      icon: <FaGraduationCap size={22} />,
    },
    {
      name: "PDF Materials",
      link: "/categories/pdf-materials",
      icon: <FaBook size={22} />,
    },
    {
      name: "Past Questions",
      icon: <FaBook size={22} />,
      link: "/categories/past-questions",
      // subItems: [
      //   { label: "English", link: "/past-question/english" },
      //   { label: "Math", link: "/past-question/math" },
      //   { label: "Physics", link: "/past-question/physics" },
      //   { label: "Chemistry", link: "/past-question/chemistry" },
      // ],
    },
    {
      name: "Leader Board",
      link: "/leader-board",
      icon: <FaTrophy size={22} color="gold" />,
    },
  ];

  const userProfileData = [
    {
      id: "username",
      label: "Username",
      label2: user ? `${user.displayName.split(" ")[0]}` : "",
      readOnly: true,
    },
    {
      id: "fullName",
      label: "Name & Surname",
      type: "text",
      placeholder: "Uche Kolade",
    },
    {
      id: "email",
      label: "Email",
      label2: user ? user.email : "",
      readOnly: true,
    },
    {
      id: "phone",
      label: "Phone",
      type: "text",
      placeholder: "+234 123 4567 891",
    },
    {
      id: "country",
      label: "Country",
      label2: "Nigeria",
      readOnly: true,
    },
  ];

  return (
    <section className="user-profile">
      <div className="inner-profile1">
        <div className="profile-logo-container">
          <div className="profile-logo" onClick={handlePageReload}></div>
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
                <FaGraduationCap size={25} /> JAMB CBT
              </Link>
            </li>
            <li className="each-menu">
              <Link
                to="#"
                onClick={() => {
                  handlePageLoading("/categories/post-utme");
                }}
                className="profile-custom-links"
              >
                <FaGraduationCap size={25} /> Post-UTME Test
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
                  handlePageLoading("/leader-board");
                }}
                className="profile-custom-links"
              >
                <FaTrophy size={20} /> Leader Board
              </Link>
            </li>
            <li className="each-menu">
              <Link
                to="#"
                onClick={() => {
                  handlePageLoading("/categories/pdf-materials");
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
                  handlePageLoading("/categories/past-questions");
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
          <button
            className="profile-btn"
            onClick={() => {
              handlePageLoading("/overview");
            }}
          >
            Overview
          </button>
        </div>
        <div className="bottom-profile">
          <div className="left-profile">
            <div>
              <EmailAvatar
                email={user?.email || "guest@example.com"}
                size={120}
                fontSize={40}
              />
            </div>

            <div className="profile-div">
              <div
                className="confirmed-container"
                type="button"
                onClick={handlePayNow}
              >
                {paymentCompleted ? (
                  <button className="confirmed">Paid</button>
                ) : (
                  <button className="not-confirmed">Pay Now</button>
                )}
              </div>
              /
              <div
                className="confirmed-container"
                type="button"
                onClick={() => handlePageLoading("/categories/JambCBT")}
              >
                <button className="take">Take Test</button>
              </div>
            </div>
          </div>
          <div className="right-profile">
            <form className="form-container" onSubmit={handleAdd}>
              {userProfileData.map((input) => (
                <div className="form-input" key={input.id}>
                  <label style={{ fontSize: "1rem", color: "black" }}>
                    {input.label}:
                  </label>
                  {isEditing[input.id] ? (
                    <input
                      id={input.id}
                      type={input.type || "text"}
                      placeholder={input.placeholder || ""}
                      value={data[input.id] || input.label2 || ""}
                      onChange={handleInput} // Uses your existing handleInput
                    />
                  ) : (
                    <span style={{ cursor: "pointer" }}>
                      {data[input.id] || input.label2 || "Not provided"}
                      {!input.readOnly && !success && !data[input.id] && (
                        <FaEdit
                          onClick={() =>
                            !input.readOnly && !success && toggleEdit(input.id)
                          } // Trigger edit mode only on click of the icon
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </span>
                  )}
                  {isEditing[input.id] && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Stop event propagation to avoid unintended side effects
                        toggleEdit(input.id); // Only toggle the edit mode
                      }}
                    >
                      <FaCheck size={10} />
                    </button>
                  )}
                </div>
              ))}

              {/* Save button: only shown when editing is active and not already saved */}
              {!success && (
                <button className="profile-btn" type="submit">
                  Save
                </button>
              )}
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

            <div className="logo-new">
              <Link onClick={handlePageReload}>
                <img src={theme.logoImage} alt="" />
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

        {isOpen && <div className="main-back-drop"></div>}
        {isOpen && (
          <div className="main-inner-h-new slideIn">
            <div className="profile-logo-container">
              <div className="profile-logo" onClick={handlePageReload}></div>
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
              <FaSignOutAlt color="white" size={15} />
              <p>Logout</p>
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className="load-overlay">
          <div className="load-slide">
            <div className="load-bar"></div>
          </div>
        </div>
      )}
      {success && (
        <div className="profile-updated slideIn">Profile Updated</div>
      )}
      {incomplete && (
        <div className="profile-incomplete slideIn">Incomplete Profile</div>
      )}
      {tryAgain && (
        <div className="profile-incomplete slideIn">Try Again Later</div>
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
