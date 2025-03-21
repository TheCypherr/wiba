import React, { useState, useEffect } from "react";
import "./Overview.css";
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
  FaEllipsisV,
  FaChevronDown,
  FaTrophy,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { useFirebaseUser } from "../../../utils/FirebaseContext";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
  onSnapshot,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../config/Firebase";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../../../config/Firebase";

const Overview = () => {
  const { user, setUser } = useFirebaseUser();
  const [activeMenu, setActiveMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFirestoreId, setSelectedFirestoreId] = useState(null);
  const [theme, setTheme] = useState({
    background: true,
    logoBg: true,
    textColor: false,
    logoTextColor: true,
  });

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

  const paginationModel = { page: 0, pageSize: 5 };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        const { firestoreId } = params.row; // Access firestoreId from the row data
        return (
          <div className="delete-score">
            <button
              className="deleteButton"
              onClick={() => handleQuizDeletePopup(firestoreId)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  // user column for different screens
  const [columns, setColumns] = useState([
    { field: "id", headerName: "ID", width: 40 },
    { field: "test", headerName: "Test Taken", width: 250 },
    { field: "score", headerName: "Score", width: 100 },
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        // Adjust columns width for mobile view
        setColumns([
          { field: "id", headerName: "ID", width: 20 },
          { field: "test", headerName: "Test Taken", width: 150 },
          { field: "score", headerName: "Score", width: 80 },
        ]);
      } else {
        // Default column widths for larger screens
        setColumns([
          { field: "id", headerName: "ID", width: 40 },
          { field: "test", headerName: "Test Taken", width: 250 },
          { field: "score", headerName: "Score", width: 100 },
        ]);
      }
    };

    // Call handleResize initially and on window resize
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Show quiz score in the overview section
  const [quizScores, setQuizScores] = useState([]);
  const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user); // Ensure user data is available after refresh
  //     } else {
  //       setUser(null); // Clear user state if no user is logged in
  //     }
  //   });
  //   return () => unsubscribeAuth();
  // }, []);

  useEffect(() => {
    if (!user || !user.userId) {
      console.error("No logged in userId Available");
      return;
    }

    if (!db) {
      console.error("Firestore database is not initialized!");
      return;
    }

    console.log(user, "Logged in user");
    console.log(user.userId, "Current user ID");
    console.log(
      db,
      user.userId,
      "Both db and userId are currently initialized"
    );

    if (user) {
      const userId = user.userId || ""; // Logged-in user's ID from firebaseContext
      const userQuizzesRef = collection(db, "userScores", userId, "quizzes");

      // Real-time listener for quiz scores
      const unsubscribe = onSnapshot(userQuizzesRef, (snapshot) => {
        const data = snapshot.docs.map((doc, index) => {
          const docData = doc.data() || {}; // {} incase of undefined data
          return {
            id: index + 1, // Sequential ID for display
            firestoreId: doc.id, // Firestore document ID
            test: docData?.testName || "No Record",
            score: docData?.result || "0 / 0",
          };
        });

        console.log(
          "Snapshot Docs:",
          snapshot.docs.map((doc) => doc.data())
        );

        setQuizScores(data); // Update quiz scores
        const progressPercentage = calculateProgress(data); // Recalculate progress
        setProgress(progressPercentage); // Update progress

        // Save progress to Firestore
        saveProgressToFirestore(user.userId, progressPercentage);
      });

      // Cleanup listener on component unmount
      return () => unsubscribe();
    } else {
      console.error("No user is logged in!");
    }
  }, [user, db]); // Run effect when user or db changes

  // Progress calculation
  const calculateProgress = (quizScores) => {
    if (quizScores.length === 0) return 0; // Avoid division by zero

    // Sum up all individual quiz scores and total possible scores
    let totalScore = 0;
    let maxScore = 0;

    quizScores.forEach((quiz) => {
      if (typeof quiz.score === "string" && quiz.score.includes("/")) {
        const [score, total] = quiz.score.split("/").map(Number); // Parse "30 / 50"
        totalScore += score || 0; // Add individual quiz score
        maxScore += total || 0; // Add individual quiz's max score
      }
    });

    // Avoid division by zero if maxScore is 0
    if (maxScore === 0) return 0;

    // Calculate cumulative progress as a percentage
    return Math.floor((totalScore / maxScore) * 100); // Round down to nearest integer
  };

  // Saving Percentage Progress to Firestore:
  const saveProgressToFirestore = async (userId, progressPercentage) => {
    if (progressPercentage === 0) {
      return;
    }

    try {
      const userProgressRef = doc(db, "userProgress", userId); // Create the userProgress document
      await setDoc(
        userProgressRef,
        { progress: progressPercentage },
        { merge: true }
      ); // Save progress
      console.log("Progress saved successfully for user", userId);
    } catch (error) {
      console.error("Error saving progress to Firestore:", error);
    }
  };

  // useEffect to prevent scrolling when popup is shown
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showPopup]);

  // Function to show the popup for Delete quiz score from overview section
  const handleQuizDeletePopup = (firestoreId) => {
    setSelectedFirestoreId(firestoreId); // Save the ID of the quiz to delete
    setShowPopup(true);
    window.scrollTo(0, 0);
  };

  // Function to confirm deletion of the quiz score
  const confirmDelete = async () => {
    setShowPopup(false); // Hide popup

    try {
      // Reference to the specific quiz score document
      const docRef = doc(
        db,
        "userScores",
        user.userId,
        "quizzes",
        selectedFirestoreId
      );
      await deleteDoc(docRef); // Delete the document from Firestore
    } catch (error) {
      console.error("Error deleting score:", error);
      alert("Failed to delete score. Please try again.");
    }
  };

  // Function to cancel deletion
  const cancelDelete = () => {
    setShowPopup(false); // Close the popup
  };

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
          <p>Student Overview</p>
          <button
            className="profile-btn"
            onClick={() => {
              handlePageLoading("/profile");
            }}
          >
            Profile
          </button>
        </div>

        <div className="bottom-profile bottom-overview">
          <div className="progress-bar">
            <div className="progress-top">
              <h1>Your Current Progress</h1>
              <FaEllipsisV fontSize="small" />
            </div>
            <div className="progress-bottom">
              <div className="featured-chart">
                <CircularProgressbar
                  value={progress}
                  text={progress ? `${progress}%` : "0%"}
                  styles={buildStyles({
                    pathColor: progress > 50 ? "green" : "red",
                    trailColor: "#eee",
                    textColor: theme ? "var(--text-color)" : "var(--bg-color)",
                  })}
                  strokeWidth={7}
                />
              </div>
              <p className="title">Cummulative Learning Grade Point</p>
            </div>
          </div>

          <div className="score-table">
            <div className="progress-top">
              <h1>Quiz Scores</h1>
              <FaEllipsisV fontSize="small" />
            </div>
            <div
              className="score-data"
              style={{
                color: theme ? "var(--text-color)" : "var(--bg-color)",
                backgroundColor: theme
                  ? "var(--bg-color)"
                  : "var(--text-color)",
              }}
            >
              <DataGrid
                rows={quizScores}
                columns={columns.concat(actionColumn)}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[4, 10]}
                checkboxSelection
                sx={{
                  border: 0,
                  width: "100%",
                  maxWidth: {
                    xs: "300px", // For extra-small screens (mobile)
                    sm: "450px", // For small screens (tablet)
                    md: "700px", // For medium screens and above (desktop)
                  },

                  // General Styles for Entire Grid
                  "& .MuiDataGrid-root": {
                    backgroundColor: theme
                      ? "var(--bg-color)"
                      : "var(--text-color)",
                    color: theme ? "var(--text-color)" : "var(--bg-color)",
                  },

                  // Header Styling
                  "& .MuiDataGrid-columnHeader": {
                    backgroundColor: theme
                      ? "var(--bg-color)"
                      : "var(--text-color)",
                    color: theme ? "var(--text-color)" : "var(--bg-color)",
                  },

                  // Cell Styling
                  "& .MuiDataGrid-cell": {
                    backgroundColor: theme
                      ? "var(--bg-color)"
                      : "var(--text-color)",
                    color: theme ? "var(--text-color)" : "var(--bg-color)",
                  },
                  "& .MuiDataGrid-filler": {
                    backgroundColor: theme
                      ? "var(--bg-color)"
                      : "var(--text-color)",
                    color: theme ? "var(--text-color)" : "var(--bg-color)",
                  },

                  // Pagination Styling (applies globally for this instance)
                  "& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                    {
                      color: theme ? "var(--text-color)" : "var(--bg-color)",
                    },

                  "& .MuiTablePagination-select": {
                    backgroundColor: theme
                      ? "var(--bg-color)"
                      : "var(--text-color)",
                    color: theme ? "var(--text-color)" : "var(--bg-color)",
                  },

                  "& .MuiTablePagination-root": {
                    backgroundColor: theme
                      ? "var(--bg-color)"
                      : "var(--text-color)",
                    color: theme ? "var(--text-color)" : "var(--bg-color)",
                  },

                  // Optional: Checkbox Styling
                  "& .MuiDataGrid-checkboxInput": {
                    color: theme ? "var(--text-color)" : "var(--bg-color)",
                  },

                  "& .MuiTablePagination-actions button": {
                    backgroundColor: theme
                      ? "var(--bg-color)"
                      : "var(--text-color)",
                    color: theme ? "var(--text-color)" : "var(--bg-color)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: theme
                        ? "var(--bg-color)"
                        : "var(--text-color)",
                    },
                    "&:disabled": {
                      backgroundColor: theme
                        ? "var(--bg-color)"
                        : "var(--text-color)",
                      color: theme ? "var(--text-color)" : "var(--bg-color)",
                    },
                  },
                  "& .MuiDataGrid-sortIcon": {
                    display: "none",
                  },
                  "& button.MuiButtonBase-root.MuiIconButton-root.MuiDataGrid-menuIconButton":
                    {
                      display: "none",
                    },
                }}
              />
            </div>
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

      {showPopup && <div className="popup-backdrop"></div>}
      {showPopup && (
        <div className="popup-container">
          <div className="popup-texts">
            <h3>Are you sure you want to delete this quiz score?</h3>
            <p>This action cannot be undone!</p>
          </div>
          <div className="popup-btns">
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}

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

export default Overview;
