import React, { useState } from "react";
import "./MainHome.css";
import { useFirebaseUser } from "../../../utils/FirebaseContext";
import { useNavigate } from "react-router-dom";

const MainHome = () => {
  const { user } = useFirebaseUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    </section>
  );
};

export default MainHome;
