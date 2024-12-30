import React, { useState, useEffect } from "react";
import "./MainHome.css";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../config/Firebase";
import { useFirebaseUser } from "../../../utils/FirebaseContext";

const MainHome = () => {
  const { user } = useFirebaseUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // useEffect for Disclaimer pop-out
  useEffect(() => {
    const checkUserProfile = async () => {
      if (!user) {
        console.log("No user logged in");
        return;
      }

      console.log("User:", user);

      try {
        // Access the userProfiles collection and get the specific user's document
        const userProfileRef = doc(collection(db, "userProfiles"), user.userId);
        const userProfileSnap = await getDoc(userProfileRef);

        if (userProfileSnap.exists()) {
          const userProfile = userProfileSnap.data();

          // Check if fullName or phone is missing
          if (!userProfile.fullName || !userProfile.phone) {
            setShowDisclaimer(true);

            const timer = setTimeout(() => {
              setShowDisclaimer(false);
            }, 10000);

            return () => clearTimeout(timer); // Cleanup timeout
          } else {
            console.log("User profile is complete.");
          }
        } else {
          setShowDisclaimer(true);

          setTimeout(() => {
            setShowDisclaimer(false);
          }, 5000);
          console.log("User profile document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    checkUserProfile();
  }, [user, db]);

  // Function to handle Page Loading
  const handlePageLoading = (targetPage) => {
    setLoading(true); // start the loading

    // simulate the loading time
    setTimeout(() => {
      setLoading(false); // stop loading after timeout
      navigate(targetPage); // navigate to target page
    }, 2000); // come back to adjust timer oooo
  };

  return (
    <section className="main-home-wrapper">
      <div className="inner-main-home-new">
        <div className="inner-home1">
          <p>{user ? `Welcome ${user.displayName.split(" ")[0]}!` : ""}</p>
          {/* <p>
            {user ? `Welcome ${user.displayName.split(" ").slice(-1)[0]}!` : ""}
          </p> */}
        </div>
        <div className="inner-home2">
          <div className="inner-home-img-container">
            <img src="/wiba444.webp" alt="" />
          </div>
          <h1>Start your Comprehensive Learning Journey.</h1>
          <div className="home-btn">
            <button
              onClick={() => handlePageLoading("/categories/past-questions")}
            >
              View Materials
            </button>
          </div>
        </div>
      </div>

      <div className="inner-main-home">
        <div className="inner-home1">
          <p>{user ? `Welcome ${user.displayName.split(" ")[0]}!` : ""}</p>
          {/* <p>
            {user ? `Welcome ${user.displayName.split(" ").slice(-1)[0]}!` : ""}
          </p> */}
          <h1>Start your Comprehensive Learning Journey.</h1>
        </div>
        <div className="inner-home2">
          <div className="inner-home-img-container">
            <img src="/wiba444.webp" alt="" />
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

      {showDisclaimer && (
        <div
          className={`green-disclaimer ${
            showDisclaimer ? "slide-in" : "slide-out"
          }`}
        >
          <p>
            {user
              ? `Hi ${
                  user.displayName.split(" ")[0]
                }! Please complete your profile for easy navigation on WibA.`
              : ""}
          </p>
        </div>
      )}
    </section>
  );
};

export default MainHome;
